import {
    IndexModel
} from '../../models/index';
import {
    CartModel
} from '../../models/cart';
import {
    ProductModel
} from '../../models/product';
import {
    md5
} from "../../utils/md5.js";
import {
    getUUID
} from "../../utils/util.js";
const app = getApp();
const indexModel = new IndexModel();
const cartModel = new CartModel();
const productModel = new ProductModel();
Page({
    data: {
        scrollPxHeight: wx.getSystemInfoSync().windowHeight,
        countmoney: 0,
        cartNum: 0,
        cartIdsStr: '',
        storeIdsStr: '',
        minusStatus: 'disabled',
        foothidden: false,
        cartList: [],
        selectList: [],
        confirmOrderStatus: true, //结算按钮状态
        page_count: 0, //共多少件商品
        changeSukProduct: {},
        productAttr: [], //产品规格列表
        productValue: '', //改变后的规格名
        productSelect: {}, //当前选中的商品
        change_cart_id: 0, //修改属性的购物车ID
    },

    onLoad: function(options) {
        let that = this;
        //app.isLogin(() => {})
    },


    onReady: function() {
        let height = wx.getSystemInfoSync().windowHeight; //设备可视高度
        let width = wx.getSystemInfoSync().windowWidth; //设备可视宽度
        let bottomPxHeight = 190 / (750 / width);
        let scrollPxHeight = height - bottomPxHeight; //滚动区域高度(px)
        this.setData({
            scrollPxHeight
        });
    },

    onShow: function() {
        this.setData({
            countmoney: 0,
            cartNum: 0,
            cartIdsStr: '',
            storeIdsStr: '',
            minusStatus: 'disabled',
            foothidden: false,
            cartList: [],
            confirmOrderStatus: true, //结算按钮状态
        })
        cartModel.getCartList()
            .then(res => {
                this.setData({
                    cartList: res.data.resultlist,
                    page_count: res.data.pagelist.page_count
                })
                //wx.setStorageSync('cartNum', res.data.pagelist.page_count)
            })
    },

    btnedittap: function(e) {
        //编辑商品
        this.data.foothidden = !this.data.foothidden;
        this.setData({
            foothidden: this.data.foothidden
        })
    },

    modelbg: function(e) {
        //关闭遮罩层
        this.setData({
            prostatus: false
        })
    },

    changeSuk(e) {
        let cart_id = e.currentTarget.dataset.cartid;
        this.setData({
            change_cart_id: cart_id,
            changeSukProduct: e.currentTarget.dataset.item,
            prostatus: true,
            show: false,
            status: 1,
        })
        //获得属性
        productModel.getProductAttr({
            list_id: e.currentTarget.dataset.id
        }).then((res => {
            let datalist = res.data.attrlist.length > 0 ? res.data.attrlist : [];
            datalist.map((val, i) => {
                let oldarr = val.attr_values.split(',');
                for (let i = 0; i < oldarr.length; i++) {
                    oldarr[i] = {
                        'val': oldarr[i],
                        'check': false
                    }
                }
                val.attr_values = oldarr;
            })
            this.setData({
                // prostatus: true,
                show: false,
                productAttr: datalist,
                productValue: res.data.attrvaluelist,

            })
        }))
    },
    subBuy(e) {
        //确定
        let attrValue = '';
        let unique = '';
        this.data.productValue.map((val) => {
            if (val.unique == this.data.productSelect.unique) {
                attrValue = val.suk;
                unique = val.unique
            }
        })
        let data = {
            list_id: this.data.change_cart_id,
            unique: unique
        }
        cartModel.editCart(data)
            .then(res => {
                wx.showToast({
                    title: res.indo,
                });
                this.onShow();
            })
        this.setData({
            prostatus: false
        })
    },

    tapsize: function(e) {
        //标红属性
        var key = e.currentTarget.dataset.key;
        var attrName = e.currentTarget.dataset.name;
        var index = e.currentTarget.dataset.index;
        var fatherindex = e.currentTarget.dataset.fatherindex;
        var attrValues = [];
        let productAttr = this.data.productAttr;
        let productValue = this.data.productValue;
        productAttr[fatherindex].attr_values.map((val) => {
            val.check = false; //其他点击属性变灰
        })
        productAttr[fatherindex].attr_values[index].check = true; //当前点击属性变红
        let checked = [];
        productAttr.map((val) => {
            val.attr_values.map((val) => {
                if (val.check) {
                    checked.push(val.val);
                    return;
                }
            })
        })
        if (checked.length == productAttr.length) {
            //属性都选中了
            productValue.map((val) => {
                if (val.suk == checked.join(',')) {
                    this.setData({
                        productSelect: val,

                    })
                }
            })
            this.setData({
                isSelect: true
            })

        } else {
            this.setData({
                isSelect: false
            })
        }
        this.setData({
            productAttr
        })

    },
    //输入数量
    setNumber(e) {
        let index = e.currentTarget.dataset.item;
        let listIndex = e.currentTarget.dataset.listindex;
        let cartList = this.data.cartList[listIndex].product;
        //let cartList = this.data.cartList;
        let num = parseInt(e.detail.value);
        let cart_num = num ? num : 1;
        if (cartList[index].stock) {
            if (cart_num > cartList[index].stock) {
                cart_num = cartList[index].stock;
                wx.showToast({
                    title: '库存不足',
                    icon: 'none'
                })
            }
        }
        cartList[index].cart_num = cart_num;
        this.data.cartList[listIndex].product = cartList;
        this.setData({
            cartList: this.data.cartList
        });
        //购物车数量修改
        let data = {
            list_id: this.data.cartList[listIndex].product[index].list_id,
            cart_num: this.data.cartList[listIndex].product[index].cart_num
        }
        this.data.cartList[listIndex].product[index].product_unique ? data.unique = this.data.cartList[listIndex].product[index].product_unique : '';
        cartModel.editCart(data)
        this.carnum();
        this.countmoney();
    },

    //加
    numAddClick(event) {
        let index = event.currentTarget.dataset.index;
        let listIndex = event.currentTarget.dataset.listindex;
        let cartList = this.data.cartList[listIndex].product;
        let cart_num = +cartList[index].cart_num + 1;
        if (cartList[index].stock) {
            if (cart_num > cartList[index].stock) {
                cart_num = cartList[index].stock;
                wx.showToast({
                    title: '库存不足',
                    icon: 'none'
                })
            }
        }
        cartList[index].cart_num = cart_num;
        let minusStatus = cartList[index].cart_num <= 1 ? 'disabled' : 'normal';
        cartList[index].minusStatus = minusStatus;
        this.data.cartList[listIndex].product = cartList;
        this.setData({
            cartList: this.data.cartList
        });
        //购物车数量修改
        let data = {
            list_id: this.data.cartList[listIndex].product[index].list_id,
            cart_num: this.data.cartList[listIndex].product[index].cart_num
        }
        this.data.cartList[listIndex].product[index].product_unique ? data.unique = this.data.cartList[listIndex].product[index].product_unique : '';
        cartModel.editCart(data)
        this.carnum();
        this.countmoney();
    },

    //减
    numDescClick(event) {
        let index = event.currentTarget.dataset.index;
        let listIndex = event.currentTarget.dataset.listindex;
        let cartList = this.data.cartList[listIndex].product;
        cartList[index].cart_num = cartList[index].cart_num <= 1 ? 1 : +cartList[index].cart_num - 1;
        let minusStatus = cartList[index].cart_num <= 1 ? 'disabled' : 'normal';
        cartList[index].minusStatus = minusStatus;
        this.data.cartList[listIndex].product = cartList;
        this.setData({
            cartList: this.data.cartList
        });
        //购物车数量修改
        let data = {
            list_id: this.data.cartList[listIndex].product[index].list_id,
            cart_num: this.data.cartList[listIndex].product[index].cart_num
        }
        this.data.cartList[listIndex].product[index].product_unique ? data.unique = this.data.cartList[listIndex].product[index].product_unique : '';
        cartModel.editCart(data)
        this.carnum();
        this.countmoney();
    },

    //店铺全选
    switchStoreSelect(e) {
        let index = e.currentTarget.dataset.index;
        let cartList = this.data.cartList;
        let checked = this.data.cartList[index].checked;
        cartList[index].checked = !checked;
        cartList[index].product.map((val) => {
            val.checked = !checked
        })
        let selectnum = []
        for (let i = 0; i < cartList.length; i++) {
            if (cartList[i].checked == true) {
                selectnum.push(true);
            }
        }
        if (selectnum.length == cartList.length) {
            this.data.isAllSelect = true;
        } else {
            this.data.isAllSelect = false;
        }
        this.setData({
            cartList: cartList,
            isAllSelect: this.data.isAllSelect
        });
        this.carnum();
        this.countmoney();
    },

    //单选；
    switchSelect(e) {
        let index = e.currentTarget.dataset.index;
        let listIndex = e.currentTarget.dataset.listindex;
        let cartList = this.data.cartList;
        let productList = this.data.cartList[listIndex].product;
        productList[index].checked = !productList[index].checked;
        let len = this.data.cartList.length;
        let allselectnum = [];
        for (let i = 0; i < len; i++) {
            let selectnum = [];
            let _product = cartList[i].product;
            for (let j = 0; j < _product.length; j++) {
                if (_product[j].checked == true) {
                    selectnum.push(1);
                }
            }
            if (selectnum.length == _product.length) {
                cartList[i].checked = true;
                allselectnum.push(1);
            } else {
                cartList[i].checked = false;
            }

        }
        if (allselectnum.length == len) {
            this.data.isAllSelect = true;
        } else {
            this.data.isAllSelect = false;
        }
        this.setData({
            cartList: cartList,
            isAllSelect: this.data.isAllSelect
        });
        this.carnum();
        this.countmoney();
    },

    //全选
    allChecked(e) {
        let selectAllStatus = this.data.isAllSelect;
        selectAllStatus = !selectAllStatus;
        let array = this.data.cartList;
        for (let i = 0; i < array.length; i++) {
            array[i].checked = selectAllStatus;
            let _product = array[i].product;
            for (let j = 0; j < _product.length; j++) {
                _product[j].checked = selectAllStatus;
            }
        };
        this.setData({
            cartList: this.data.cartList,
            isAllSelect: selectAllStatus
        })
        this.carnum();
        this.countmoney();
    },

    //计算总数量
    carnum() {
        let carnum = 0;
        let array = this.data.cartList;
        for (let i = 0; i < array.length; i++) {
            let _product = array[i].product;
            for (let j = 0; j < _product.length; j++) {
                if (_product[j].checked == true) {
                    carnum += parseInt(_product[j].cart_num);
                }
            }
        }
        this.setData({
            cartNum: carnum
        })
    },

    //计算总共价钱；
    countmoney() {
        var carmoney = 0;
        var array = this.data.cartList;
        for (var i = 0; i < array.length; i++) {
            let _product = array[i].product;
            for (let j = 0; j < _product.length; j++) {
                if (_product[j].checked == true) {
                    carmoney += parseFloat(_product[j].cart_num * Number(_product[j].price));
                }
            }
        }
        this.setData({
            countmoney: carmoney.toFixed(2)
        })
    },

    confirmOrder: function() {
        //计算订单ID
        let array = this.data.cartList;
        let checkCartIds = [];
        let checkStoreIds = [];
        let selectList = [];
        array.map((value) => {
            value.product.map((val) => {
                if (val.checked) {
                    checkCartIds.push(val.list_id);
                    selectList.push(val);
                    //数组去重
                    checkStoreIds.push(value.store.mer_id);
                    checkStoreIds = new Set(checkStoreIds)
                    checkStoreIds = [...checkStoreIds]
                }
            })
        });
        if (checkCartIds.length > 0) {
            this.setData({
                cartIdsStr: checkCartIds.join(','),
                storeIdsStr: checkStoreIds.join(','),
                selectList: selectList
            })
            this.goConfirm();
        } else {
            this.setData({
                cartIdsStr: '',
                storeIdsStr: '',
                selectList: []
            })
        }
    },

    goConfirm() {
        wx.setStorageSync('selectCarList', this.data.cartIdsStr);
        wx.setStorageSync('selectStoreList', this.data.storeIdsStr);
        wx.navigateTo({
            url: '/pages/orderConfirm/index',
        })
    },

    collectAll() {
        //移入收藏（先删除再收藏?）
        var array = this.data.cartList;
        var productIds = [];
        for (var i = 0; i < array.length; i++) {
            if (array[i].checked == true) {
                productIds.push(array[i].product_id);
            }
        }
    },

    cartDelAll() {
        //删除
        var array = this.data.cartList;
        var ids = [];
        for (var i = 0; i < array.length; i++) {
            let _product = array[i].product;
            for (let j = 0; j < _product.length; j++) {
                if (_product[j].checked == true) {
                    ids.push(_product[j].list_id);
                }
            }
        }
        let data = {
            list_id: ids.join(',')
        }
        cartModel.delCart(data)
            .then(res => {
                if (res.code) {
                    wx.showToast({
                        title: '删除成功',
                    });
                    this.onShow();
                }
            })

    },

    submitOrder() {
        if (cartIds.length > 0) {
            this.setData({
                cartIdsStr: cartIds.join(',')
            })
        }
        console.log(this.data.cartIdsStr)

    },
    onPullDownRefresh: function () {
        // 显示顶部刷新图标
        wx.showNavigationBarLoading();
        setTimeout(() => {
            wx.hideNavigationBarLoading();
            // 停止下拉动作
            wx.stopPullDownRefresh();

        }, 500)
    },
    onShareAppMessage: function() {

    }
})