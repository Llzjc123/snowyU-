import {
    md5
} from "../../utils/md5.js";
import {
    getUUID
} from "../../utils/util.js";
import {
    ProductModel
} from '../../models/product';
import {
    CartModel
} from '../../models/cart';
import {
    IndexModel
} from '../../models/index';
import {
    UserModel
} from '../../models/user';
import {
    againGroup,
    seckillTime,
    drawImg,
    getUrlParams
} from '../../utils/util.js';
const productModel = new ProductModel();
const cartModel = new CartModel();
const indexModel = new IndexModel();
const userModel = new UserModel();
const WxParse = require('../../wxParse/wxParse.js');
const app = getApp();
Page({
    data: {
        autoplay: false,
        interval: 3000, //动画间隔的时间;
        duration: 500, //动画播放的时长;
        collect: false, //是否收藏
        cartCount: app.globalData.cartNum, //购物车数量
        productDetail: {},
        couponList: [],
        isTuan: false, //是否为拼团活动
        isMiao: false, //是否为秒杀活动
        countDownHour: "00",
        countDownMinute: "00",
        countDownSecond: "00",
        productAttr: [], //商品属性
        productValue: [], //商品属性值
        productSelect: {}, //当前选中的商品
        isSelect: false, //是否选了商品属性

        posterImageStatus: false,
        attr: '选择商品属性',
        attrValue: '', //选中的属性值
        url: app.globalData.urlImages,
        storeInfo: null,
        storeKeyWord: [],
        similarity: [],

        status: 0, //点击状态1点击选择属性，2加入购物车，3立即下单
        btnStatus: true, //立即购买按钮防重点击
        reply: {}, //评论列表
        replyCount: 0, //评论数量
        description: '', //产品详情
        id: 0, //产品id
        num: 1, //产品数量
        show: false,
        prostatus: false,
        actionSheetHidden: true,
        actionSheetHidden: true,
        showSharePic: false, //分享海报显示隐藏
        sharePicUrl: '', //生成海报链接
        code_img: '',
        types: 1,
        tabActive: 0, //0商品详情1商品评价
        commentList: [], //评价列表
        isYuShow: 0, //是否预售
    },

    onLoad: function(options) {
        let types = 1;
        if (options.scene) {
            let value = getUrlParams(decodeURIComponent(options.scene));
            console.log(value)
            let spid = value.ucodeId;
            wx.setStorageSync('stair', spid);
            this.setData({
                id: value.pcodeId
            });
            if (value.types && value.types == 2) {
                this.setData({
                    isMiao: true
                })
                types = 2;
                this.getTimeProductDetail();
            } else if (value.types && value.types == 3) {
                this.setData({
                    isTuan: true
                })
                types = 3;

                this.getCombinationProductDetail();
            } else {
                types = 1;
                this.getProductDetail();
            }
        } else {
            this.setData({
                id: options.productId
            });

            if (this.options.type && this.options.type == 4) {
                this.setData({
                    isMiao: true
                })
                types = 2;
                this.getTimeProductDetail();
            } else if (this.options.type && this.options.type == 3) {
                this.setData({
                    isTuan: true
                })
                types = 3;
                this.getCombinationProductDetail();
            } else {
                types = 1;
                this.getProductDetail();
            }
        }
        this.getComment();
        let data = {
            pid: this.data.id,
            types: types
        }
        this.setData({
            types: types
        })
        userModel.getQRCode(data)
            .then(res => {
                this.setData({
                    code_img: res.data ? res.data.img_url : ''
                })
            })
    },

    onShow: function() {
        let cartNum = wx.getStorageSync('cartNum');
        this.setData({
            cartCount: cartNum ? cartNum : 0, //购物车数量
        })
        // if (!this.data.code_img) {
        //     let data = {
        //         pid: this.data.id,
        //         types: this.data.types
        //     }
        //     userModel.getQRCode(data)
        //         .then(res => {
        //             this.setData({
        //                 code_img: res.data.img_url
        //             })
        //         })
        // }
    },
    toShop(e) {
        if (this.data.productDetail.mer_id == 0) {
            wx.switchTab({
                url: '/pages/index/index',
            })
        } else {
            wx.navigateTo({
                url: '/pages/shopPage/index?id=' + this.data.productDetail.mer_id,
            })
        }

    },
    getComment() {
        let data = {
            product_id: this.data.id
        }
        productModel.getCommentList(data)
            .then(res => {
                this.setData({
                    commentList: res.data.resultlist
                })
            })
    },

    getProductDetail() {
        let data = {
            list_id: this.data.id
        }
        productModel.getProductDetail(data)
            .then((res) => {
                let data = res.data.goodslist;
                data.slider_image = JSON.parse(data.slider_image);
                this.setData({
                    isYuShow: data.is_ys,
                    yuShowTime: data.zw_out,
                    productDetail: data,
                    productSelect: data,
                    collect: res.data.collectlist.is_collect,
                    description: data.description,
                    reply: res.data.evaluatelist,
                    replyCount: res.data.evaluatelist.nums,
                    storeInfo: res.data.store ? res.data.store : null
                })
                WxParse.wxParse('description', 'html', this.data.description, this, 0);
                let params = {
                    mer_id: this.data.productDetail.mer_id
                }
                return indexModel.getCouponList(params)

            }).then(res => {
                this.setData({
                    couponList: res.data.resultlist
                })
            })
    },

    getTimeProductDetail() {
        let data = {
            id: this.data.id
        }
        productModel.getTimeProductDetail(data)
            .then((res) => {
                let data = res.data;

                seckillTime(data.stop_time, this)
                data.slider_image = JSON.parse(data.slider_image);
                this.setData({
                    productDetail: data,
                    productSelect: data,
                    // collect: res.data.collectlist.is_collect,
                    description: data.description,
                    // reply: res.data.evaluatelist,
                    // replyCount: res.data.evaluatelist.nums
                })
                WxParse.wxParse('description', 'html', this.data.description, this, 0);

            })
    },

    getCombinationProductDetail() {
        let data = {
            list_id: this.data.id
        }
        productModel.getCombinationProductDetail(data)
            .then(res => {

                let data = res.data.productlist;
                //seckillTime(data.stop_time, this)
                data.slider_image = JSON.parse(data.images);
                data.store_name = data.title;
                // data.old_prize = data.old_price;
                this.setData({
                    productDetail: data,
                    productSelect: data,
                    pinklist: res.data.pinklist ? res.data.pinklist : null,
                    // collect: res.data.collectlist.is_collect,
                    description: data.description,
                    // reply: res.data.evaluatelist,
                    // replyCount: res.data.evaluatelist.nums
                })
                WxParse.wxParse('description', 'html', this.data.description, this, 0);


            })
    },

    changeTabActive(e) {
        this.setData({
            tabActive: e.currentTarget.dataset.index
        })
    },
    collect() {
        app.isLogin(() => {
            let data = {
                list_id: this.data.id
            }
            if (this.data.collect) {
                //取消收藏
                cartModel.delCollect(data)
            } else {
                //收藏
                cartModel.addCollect(data)
            }
            this.setData({
                collect: !this.data.collect
            });

        })

    },

    callPhone() {
        wx.makePhoneCall({
            phoneNumber: this.data.storeInfo.store_tel //仅为示例，并非真实的电话号码
        })
    },

    toCoupon() {
        wx.navigateTo({
            url: '/pages/myCoupon/index?type=1&merId=' + this.data.productDetail.mer_id,
        })
    },

    selectAttr() {
        //选择属性
        this.setData({
            prostatus: true,
            show: false,
            status: 1,
        })
        if (this.data.productAttr.length == 0) {
            this._getProductAttr();
        }
    },

    parameterShow() {
        //加入购物车
        app.isLogin(() => {
            if (this.data.productSelect.unique) {
                this.getCartCount();
            } else {
                this.setData({
                    prostatus: true,
                    status: 2
                });
                this._getProductAttr();
            }

        })

    },

    goOrder() {
        //立即购买
        app.isLogin(() => {
            if (this.data.productSelect.unique || this.data.isTuan) {
                this.nowBuy();
            } else {
                this.setData({
                    prostatus: true,
                    status: 3
                });
                if (!this.data.isMiao) {
                    this._getProductAttr();
                }

            }

        })
    },

    subBuy(e) {
        //确定
        if (this.data.num > this.data.productSelect.stock) {
            wx.showToast({
                title: '库存不足' + this.data.num,
                icon: 'none',
                duration: 2000
            })
            this.setData({
                num: this.data.productSelect.stock,
            })
        } else if (this.data.productAttr.length > 0 && !this.data.productSelect.unique) {
            wx.showToast({
                title: '请选择属性',
                icon: 'none',
                duration: 2000
            })
        } else {
            if (this.data.status == 1) {
                let attrValue = '';
                this.data.productValue.map((val) => {
                    if (val.unique == this.data.productSelect.unique) {
                        attrValue = val.suk
                    }
                })
                this.setData({
                    attr: '已选',
                    attrValue: attrValue,
                    prostatus: false
                })
            } else if (this.data.status == 2) {
                this.getCartCount();
                this.setData({
                    prostatus: false
                });
            } else if (this.data.status == 3) {
                this.nowBuy();
                this.setData({
                    prostatus: false
                })

            }
        }
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

    modelbg: function(e) {
        //关闭遮罩层
        this.setData({
            prostatus: false
        })
    },

    bindMinus: function() {
        //购物车减
        let num = this.data.num;
        // 如果大于1时，才可以减  
        if (num > 1) {
            num--;
        }
        // 只有大于一件的时候，才能normal状态，否则disable状态  
        let minusStatus = num <= 1 ? 'disabled' : 'normal';
        // 将数值与状态写回  
        this.setData({
            num: num,
            minusStatus: minusStatus
        });
    },

    bindPlus: function() {
        //购物车加
        let num = this.data.num;
        // 不作过多考虑自增1  
        num++;
        // 只有大于一件的时候，才能normal状态，否则disable状态  
        let minusStatus = num < 1 ? 'disabled' : 'normal';
        // 将数值与状态写回  
        this.setData({
            num: num,
            minusStatus: minusStatus
        });
    },

    setNumber: function(e) {
        var that = this;
        var num = parseInt(e.detail.value);
        that.setData({
            num: num ? num : 1
        })
    },

    _getProductAttr() {
        //获得属性
        productModel.getProductAttr({
            list_id: this.data.id
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

    listenerActionSheet: function() {
        this.setData({
            actionSheetHidden: !this.data.actionSheetHidden
        })
    },

    getCartCount() {
        let data = {
            list_id: this.data.id,
            cart_num: this.data.num,
            mer_id: this.data.productDetail.mer_id ? this.data.productDetail.mer_id : 0,
        }
        this.data.productSelect.unique ? data.unique = this.data.productSelect.unique : ''
        cartModel.addCart(data)
            .then(res => {
                if (res.code == 1) {
                    this.setData({
                        cartCount: this.data.cartCount + 1
                    })
                    wx.setStorageSync('cartNum', this.data.cartCount);
                    wx.showToast({
                        title: res.info,
                        icon: 'none'
                    })
                } else {
                    wx.showToast({
                        title: res.info,
                        icon: 'none'
                    })
                }
            })
    },
    listenerActionSheet: function() {
        this.setData({
            actionSheetHidden: !this.data.actionSheetHidden
        })
    },
    nowBuy() {
        if (this.data.btnStatus) {
            // let data = {
            //     list_id: this.data.id,
            //     goodsnum: this.data.num,
            //     unique: md5(getUUID())
            // }
            // console.log(this.data.productSelect);
            // console.log(this.data.productDetail)

            let nowBuyProduct = this.data.productSelect;
            nowBuyProduct.list_id = this.data.id;
            nowBuyProduct.mer_id = this.data.productDetail.mer_id;
            nowBuyProduct.cart_num = this.data.num;
            nowBuyProduct.store_name = this.data.productDetail.store_name;
            nowBuyProduct.postage = this.data.productDetail.postage;
            nowBuyProduct.isMiao = this.data.isMiao;
            nowBuyProduct.isTuan = this.data.isTuan;
            wx.setStorageSync('nowBuyProduct', nowBuyProduct);
            wx.navigateTo({
                url: '/pages/orderConfirm/index?type=nowbuy',
            })
        }

    },

    getCar: function() {
        wx.switchTab({
            url: '/pages/buycar/buycar'
        });
    },

    goPoster() {
        app.isLogin(() => {
            let sharePicUrl = this.data.sharePicUrl;
            if (sharePicUrl != '') { //如果已经生成过一次直接显示
                this.setData({
                    showSharePic: true,
                    actionSheetHidden: !this.data.actionSheetHidden
                })
            } else {
                wx.showToast({
                    title: '图片生成中',
                    mask: true,
                    icon: 'loading',
                    duration: 100000
                });

                let logo = '';
                let headIcon = '';
                let code = '';
                let info = this.data.productSelect;
                this.getHead().then(headUrl => {
                    //console.log(headUrl);
                    headIcon = headUrl
                    return this.getCode();
                }).then(codeUrl => {
                    code = codeUrl;
                    drawImg(info, logo, headIcon, code, this);
                })

            }
        })

    },
    //获取logo
    getHead() {
        return new Promise((resolve, reject) => {
            wx.downloadFile({
                url: this.data.productDetail.img_url ? this.data.productDetail.img_url : this.data.productDetail.image,
                success: res => {
                    resolve(res.tempFilePath)
                }
            })
        })
    },

    //获取logo
    getLogo() {
        // return new Promise((resolve, reject) => {
        //     // wx.downloadFile({
        //     //     url: '',
        //     //     success: res => {
        //     //         resolve(res.tempFilePath)
        //     //     }
        //     // })
        // })
    },

    //获取logo
    getCode() {
        return new Promise((resolve, reject) => {
            wx.downloadFile({
                url: this.data.code_img,
                success: res => {
                    resolve(res.tempFilePath)
                }
            })
        })
    },
    //关闭分享海报
    closeShare() {
        this.setData({
            showSharePic: false
        })
    },

    //保存图片
    savePic() {
        let sharePicUrl = this.data.sharePicUrl;
        wx.getSetting({
            success: res => {
                if (res.authSetting['scope.writePhotosAlbum'] == false) {
                    wx.showModal({
                        title: '提示',
                        content: '是否授权将相册保存到相册？',
                        confirmColor: '#2ca2ed',
                        success: res => {
                            //点击确定打开授权设置
                            if (res.confirm) {

                                wx.openSetting({
                                    success: res => {

                                        setTimeout(() => {
                                            if (res.authSetting['scope.writePhotosAlbum'] == true) {

                                                wx.saveImageToPhotosAlbum({
                                                    filePath: sharePicUrl,
                                                    success: res => {
                                                        this.closeShare();
                                                        wx.showToast({
                                                            title: '保存成功！',
                                                            icon: 'success',
                                                            mask: true
                                                        })
                                                    },
                                                    fail: err => {
                                                        wx.showToast({
                                                            title: '保存失败！',
                                                            icon: 'none',
                                                            mask: true
                                                        })
                                                    }
                                                })

                                            } else {
                                                wx.showToast({
                                                    title: '保存失败！',
                                                    icon: 'none',
                                                    mask: true
                                                })
                                            }
                                        }, 500)

                                    }
                                })

                            }

                        }
                    })
                } else {

                    wx.saveImageToPhotosAlbum({
                        filePath: sharePicUrl,
                        success: res => {
                            this.closeShare();
                            wx.showToast({
                                title: '保存成功！',
                                icon: 'success',
                                mask: true
                            })
                        }
                    })

                }
            }
        })

    },
    onPullDownRefresh: function() {
        // 显示顶部刷新图标
        wx.showNavigationBarLoading();
        setTimeout(() => {
            wx.hideNavigationBarLoading();
            // 停止下拉动作
            wx.stopPullDownRefresh();

        }, 500)
    },
    onShareAppMessage: function() {
        var that = this;
        that.setData({
            actionSheetHidden: !that.data.actionSheetHidden
        })
        return {
            title: that.data.productDetail.store_name,
            path: app.globalData.openPages,
            // imageUrl: that.data.url + that.data.product.image,
            success: function() {
                wx.showToast({
                    title: '分享成功',
                    icon: 'success',
                    duration: 2000
                })
            }
        }
    }
})