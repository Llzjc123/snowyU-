const app = getApp();
import {
    ProductModel
} from '../../models/product';
const productModel = new ProductModel();
import {
    UserModel
} from '../../models/user';
const userModel = new UserModel();
import {
    CartModel
} from '../../models/cart';
const cartModel = new CartModel();
import {
    getUUID
} from "../../utils/util.js";
import {
    md5
} from "../../utils/md5.js";
Page({

    data: {
        orderId: 0,
        storelist: [], //店铺列表
        confirmOrderStatus: true, //生成按钮防重点击
        active: 0, //支付方式切换 默认微信支付
        cartArr: [{
            name: "微信支付",
            value: 'weixin',
            title: '微信快捷支付'
        }, ],
        totalPrice: 0, //订单总价格
        addressId: 0,
        addressInfo: '',
        couponList: [],
        couponId: 0,
        couponInfo: {},
        mark: '',
        payType: 'weixin',
        isUseIntegral: true, //是否使用优惠券
        orderlist: [], //提交的订单信息
    },

    onLoad: function(options) {
        wx.showLoading({
            title: "正在加载中……"
        });
        if (options.type == 'nowbuy') {
            //立即购买
            let nowBuyProduct = wx.getStorageSync('nowBuyProduct');
            if (nowBuyProduct.isTuan || nowBuyProduct.isMiao) {
                //团购秒杀不能用积分和优惠券
                this.setData({
                    isUseIntegral: false
                })
            }
            let nowBuyProductList = [nowBuyProduct];
            let postage = nowBuyProduct.postage ? nowBuyProduct.postage - 0 : 0;
            let storelist = [{
                'list_id': nowBuyProduct.list_id,
                'mer_id': nowBuyProduct.mer_id,
                'product': nowBuyProductList,
                'storeItem': nowBuyProduct.store_name,
                'total_num': nowBuyProduct.cart_num,
                'total_price': (nowBuyProduct.cart_num * (nowBuyProduct.price - 0)).toFixed(2),
                'page_count': nowBuyProductList.length,
                'postage': postage,
                'unique': nowBuyProduct.unique,
                'pink_id': nowBuyProduct.pink_id ? nowBuyProduct.pink_id : 0,
            }];
            //let totalPrice = nowBuyProduct.cart_num * (nowBuyProduct.price - 0) + postage
            if (options.coupon == 'select') {
                //处理多选优惠券
                let data = wx.getStorageSync('selectCoupon');
                let couponListStorage = wx.getStorageSync('couponList') ? wx.getStorageSync('couponList') : [];
                couponListStorage.map((val, index) => {
                    if (val.mer_id == data.mer_id) {
                        couponListStorage.splice(index, 1);
                    }
                })
                couponListStorage.push(data);
                wx.setStorageSync('couponList', couponListStorage);
                storelist[0].couponInfo = couponListStorage[0];
                storelist[0].coupon_id = couponListStorage[0].list_id;
                storelist[0].total_price = storelist[0].total_price - couponListStorage[0].coupon_price;

            } else {
                wx.setStorageSync('couponList', []);
            }
            this.setData({
                storelist: storelist,
                orderId: getUUID(),
                totalPrice: Number(storelist[0].total_price) + Number(postage)
            })
            wx.hideLoading();
            this.getaddressInfo();
        } else {
            //购物车结算、
            let data = {
                list_id: wx.getStorageSync('selectCarList'),
                mer_id: wx.getStorageSync('selectStoreList')
            }
            //缓存中取来自购物车列表ID和店铺ID，获取下单基础信息
            //随机生成一个订单ID号
            cartModel.getCartOrderList(data)
                .then(res => {
                    if (!res.code) {
                        wx.showToast({
                            title: res.info,
                            icons: 'none'
                        });
                        setTimeout(() => {
                            wx.navigateBack();
                        }, 1000);

                    } else {
                        this.getaddressInfo();
                        let totalPrice = 0;
                        let orderlist = [];
                        let storelist = res.data;
                        storelist.map((val) => {
                            totalPrice = (totalPrice * 100 + val.total_price * 100) / 100;
                            let cartId = [];
                            let total_price = 0;
                            val.product.map((val) => {
                                cartId.push(val.id);
                                total_price = total_price + val.price
                            })
                            orderlist.push({
                                mer_id: val.mer_id,
                                cart_id: cartId.join(','),
                                unique: md5(getUUID()),
                            })
                        })
                        if (options.coupon == 'select') {
                            //处理多选优惠券
                            let data = wx.getStorageSync('selectCoupon');
                            let couponListStorage = wx.getStorageSync('couponList') ? wx.getStorageSync('couponList') : [];
                            couponListStorage.map((val, index) => {
                                if (val.mer_id == data.mer_id) {
                                    couponListStorage.splice(index, 1);
                                }
                            })
                            couponListStorage.push(data);
                            wx.setStorageSync('couponList', couponListStorage);
                            totalPrice = 0;
                            for (let i = 0; i < orderlist.length; i++) {
                                for (let j = 0; j < couponListStorage.length; j++) {
                                    if (orderlist[i].mer_id == couponListStorage[j].mer_id) {
                                        storelist[i].couponInfo = couponListStorage[j];
                                        storelist[i].total_price = storelist[i].total_price - couponListStorage[j].coupon_price;
                                        orderlist[i].coupon_id = couponListStorage[j].list_id;

                                        break;
                                    }
                                }
                                totalPrice = totalPrice + storelist[i].total_price;
                            }

                        } else {
                            wx.setStorageSync('couponList', []);
                        }
                        this.setData({
                            storelist,
                            totalPrice,
                            orderlist,
                            orderId: getUUID(),
                        });
                    }

                })

        }
        if (options.address == 'select') {
            let data = wx.getStorageSync('selectAddress');
            this.setData({
                addressId: data.list_id,
                addressInfo: data
            });
        }

    },

    onShow() {

    },

    bindHideKeyboard(e) {
        if (this.options.type == 'nowbuy') {
            this.setData({
                mark: e.detail.value
            })
        } else {
            let index = e.currentTarget.dataset.index;
            let orderlist = this.data.orderlist;
            orderlist[index].mark = e.detail.value
            this.setData({
                orderlist
            });
        }
    },

    subOrder(e) {
        if (!this.data.addressId) {
            wx.showToast({
                title: '请选择收货地址',
                icon: 'none',
                duration: 1000,
            })
        } else {
            if (this.data.confirmOrderStatus) {
                this.setData({
                    confirmOrderStatus: false
                });
                wx.showLoading({
                    title: '发起支付',
                })
                let list = JSON.stringify(this.data.orderlist);
                let addressInfo = this.data.addressInfo;
                if (this.options.type == 'nowbuy') {
                    //立即购买
                    let nowData = {
                        mer_id: this.data.storelist[0].mer_id,
                        list_id: this.data.storelist[0].list_id,
                        goodsnum: this.data.storelist[0].total_num,
                        unique: md5(getUUID()),
                        product_unique: this.data.storelist[0].unique ? this.data.storelist[0].unique : '',
                        real_name: addressInfo.real_name,
                        user_phone: addressInfo.phone,
                        user_address: addressInfo.province + addressInfo.city + addressInfo.district + addressInfo.detail + addressInfo.real_name,
                        pay_type: this.data.payType,
                        coupon_id: Number(this.data.storelist[0].coupon_id) ? Number(this.data.storelist[0].coupon_id) : 0,
                        mark: this.data.mark
                    }
                    let nowBuyProduct = wx.getStorageSync('nowBuyProduct');
                    if (nowBuyProduct.isMiao) {
                        productModel.productTimeNowBuy(nowData)
                            .then(res => {
                                wx.hideLoading();
                                this.setData({
                                    confirmOrderStatus: true
                                });
                                if (res.code == 1) {
                                    let orderId = res.data.orderId;
                                    let jsConfig = res.data.wxpayment;
                                    this._wexinPay(jsConfig, orderId);
                                } else {
                                    wx.showToast({
                                        title: res.info,
                                        icon: 'none',
                                        duration: 1000,
                                    })
                                }
                            })
                    } else if (nowBuyProduct.isTuan) {
                        if (this.data.storelist[0].pink_id) {
                            nowData.pink_id = this.data.storelist[0].pink_id;
                        }
                        productModel.getCombinationProductAdd(nowData)
                            .then(res => {
                                wx.hideLoading();
                                this.setData({
                                    confirmOrderStatus: true
                                });
                                if (res.code == 1) {
                                    let orderId = res.data.orderId;
                                    let jsConfig = res.data.wxpayment;
                                    this._wexinPay(jsConfig, orderId);
                                } else {
                                    wx.showToast({
                                        title: res.info,
                                        icon: 'none',
                                        duration: 1000,
                                    })
                                }
                            })
                    } else {
                        productModel.nowBuy(nowData)
                            .then(res => {
                                wx.hideLoading();
                                this.setData({
                                    confirmOrderStatus: true
                                });
                                if (res.code == 1) {
                                    let orderId = res.data.orderId;
                                    let jsConfig = res.data.wxpayment;
                                    this._wexinPay(jsConfig, orderId);

                                } else {
                                    wx.showToast({
                                        title: res.info,
                                        icon: 'none',
                                        duration: 1000,
                                    })
                                }
                            })
                    }

                } else {
                    let data = {
                        list: list,
                        real_name: addressInfo.real_name,
                        user_phone: addressInfo.phone,
                        user_address: addressInfo.province + addressInfo.city + addressInfo.district + addressInfo.detail + addressInfo.real_name,
                        pay_type: this.data.payType,
                    }
                    productModel.orderAdd(data)
                        .then(res => {
                            wx.hideLoading();
                            this.setData({
                                confirmOrderStatus: true
                            });
                            if (res.code == 1) {
                                let orderId = res.data.orderId;
                                let jsConfig = res.data.wxpayment;
                                this._wexinPay(jsConfig, orderId);
                            } else {
                                wx.showToast({
                                    title: res.info,
                                    icon: 'none',
                                    duration: 1000,
                                })
                            }
                        })
                }

            }



        }
    },

    _wexinPay(jsConfig, orderId) {
        wx.requestPayment({
            timeStamp: jsConfig.timeStamp,
            nonceStr: jsConfig.nonceStr,
            package: jsConfig.package,
            signType: jsConfig.signType,
            paySign: jsConfig.paySign,
            success: function(res) {
                wx.showToast({
                    title: '支付成功',
                    icon: 'success',
                    duration: 1000,
                })
                setTimeout(function() {
                    wx.reLaunch({
                        url: '/pages/orderPayStatus/index?order_id=' + orderId + '&msg=支付成功',
                    })
                }, 1000)
            },
            fail: function(res) {
                wx.showToast({
                    title: '支付取消',
                    icon: 'none',
                    duration: 1000,
                })
                setTimeout(function() {
                    wx.reLaunch({
                        url: '/pages/orderPayStatus/index?order_id=' + orderId + '&msg=支付取消'
                    })
                }, 1000)
            },
            complete: function(res) {
                if (res.errMsg == 'requestPayment:cancel') {
                    wx.showToast({
                        title: '取消支付',
                        icon: 'none',
                        duration: 1000,
                    })
                    setTimeout(function() {
                        wx.reLaunch({
                            url: '/pages/orderPayStatus/index?order_id=' + orderId + '&msg=取消支付',
                        })
                    }, 1000)
                }
            },
        })
    },

    getaddressInfo() {
        if (this.data.addressId) {
            wx.hideLoading();
        } else {
            userModel.getDefault()
                .then(res => {
                    this.setData({
                        addressInfo: res.data ? res.data : {},
                        addressId: res.data ? res.data.list_id : 0
                    })
                    wx.hideLoading();
                })
        }
    },

    getAddress: function() {
        let url = '/pages/my/myAddress/index?orderId=' + this.data.orderId;
        if (this.options.coupon == 'select') {
            url = url + '&coupon=select';
        }
        if (this.options.type == 'nowbuy') {
            url = url + '&type=nowbuy';
        }
        wx.navigateTo({
            url
        })

    },

    getCoupon(e) {
        let index = e.currentTarget.dataset.index;
        let money = e.currentTarget.dataset.item.total_price;
        let merId = e.currentTarget.dataset.item.mer_id;
        let url = '/pages/myCoupon/index?orderId=' + this.data.orderId + '&money=' + money + '&merId=' + merId
        if (this.options.address == 'select') {
            url = url + '&address=select'
        }
        if (this.options.type == 'nowbuy') {
            url = url + '&type=nowbuy';
        }
        wx.navigateTo({
            url
        })
    }

})