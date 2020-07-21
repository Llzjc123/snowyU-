const app = getApp();
import {
    ProductModel
} from '../../models/product';
const productModel = new ProductModel();
Page({

    data: {
        url: app.globalData.urlImages,
        list_id: 0, //订单ID
        listInfo: {},
        type: 0, //订单状态1代付款2代发货3待收货4待评价5交易完成
    },

    onLoad: function(options) {
        if (options.order_id) {
            this.setData({
                list_id: options.order_id
            })
            this.getOrderDetail();
        }
        wx.showLoading({
            title: "正在加载中……"
        });
        //.hideLoading();
    },

    getOrderDetail() {
        productModel.getOrderDetail({
                list_id: this.data.list_id
            })
            .then(res => {
                this.setData({
                    listInfo: res.data
                })
                wx.hideLoading();
            })

    },
    //选择付款方式
    checkPay(e) {
        let data = {
            list_id: this.data.list_id
        }
        if (this.data.listInfo.orderlist.pink_id > 0) {
            productModel.orderTuanPay(data)
                .then(res => {
                    if (res.code == 1) {
                        let jsConfig = res.data.wxpayment;
                        this._wexinPay(jsConfig, );
                        // console.log(jsConfig);

                    } else if (res.code == 2) {
                        wx.showToast({
                            title: res.info + ',请重新提交订单',
                            icon: 'none',
                            duration: 2000
                        })
                    } else {
                        wx.showToast({
                            title: res.info,
                            icon: 'none',
                            duration: 2000
                        })
                    }
                });

            //团购
        } else if (this.data.listInfo.orderlist.seckill_id > 0) {
            productModel.orderMiaoPay(data)
                .then(res => {
                    console.log(res)
                    if (res.code == 1) {
                        let jsConfig = res.data.wxpayment;
                        this._wexinPay(jsConfig);
                    } else if (res.code == 2) {
                        wx.showToast({
                            title: res.info + ',请重新提交订单',
                            icon: 'none',
                            duration: 2000
                        })
                    } else {
                        wx.showToast({
                            title: res.info,
                            icon: 'none',
                            duration: 2000
                        })
                    }
                });

            //秒杀
        } else {
            productModel.orderPay(data)
                .then(res => {
                    if (res.code == 1) {
                        let jsConfig = res.data.wxpayment;
                        this._wexinPay(jsConfig);
                    } else if (res.code == 2) {
                        wx.showToast({
                            title: res.info + ',请重新提交订单',
                            icon: 'none',
                            duration: 2000
                        })
                    } else {
                        wx.showToast({
                            title: res.info,
                            icon: 'none',
                            duration: 2000
                        })
                    }
                });

        }
        return;
        // wx.showActionSheet({
        //     itemList: ['微信支付', '余额支付'],
        //     success(res) {
        //         let paytype = res.tapIndex ? 'yue' : 'weixin';
        //         console.log(paytype)


        //     },
        //     fail(res) {
        //         console.log(res.errMsg)
        //     },
        // })
    },

    _wexinPay(jsConfig) {
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
                    wx.navigateTo({ //跳转至指定页面并关闭其他打开的所有页面
                        url: '/pages/orderList/index?nowstatus=2'
                    })
                }, 1200)
            },
            fail: function(res) {
                wx.showToast({
                    title: '取消支付',
                    icon: 'success',
                    duration: 1000,
                })
            },
            complete: function(res) {
                console.log(res);
                if (res.errMsg == 'requestPayment:cancel') {
                    wx.showToast({
                        title: '取消支付',
                        icon: 'none',
                        duration: 1000,
                    })
                }
            },
        })
    },
    toGoodDetail(e) {
        let data = e.currentTarget.dataset.item;
        if (this.data.listInfo.orderlist.status == 3) {
            wx.navigateTo({
                url: '/pages/productDetail/index?productId=' + data.product_id,
            })
        }
    },
    delOrder(e) {
        let data = {
            list_id: e.currentTarget.dataset.uni
        }
        wx.showModal({
            title: '确认删除订单？',
            content: '订单删除后将无法查看',
            success: function(res) {
                if (res.confirm) {
                    productModel.orderDel(data)
                        .then(res => {
                            if (res.code) {
                                wx.showToast({
                                    title: '删除成功',
                                    icon: 'success',
                                    duration: 2000
                                })
                                setTimeout(function() {
                                    // wx.navigateBack()
                                    wx.switchTab({
                                        url: '/pages/my/my',
                                    })
                                    // wx.redirectTo({
                                    //     url: '/pages/orderList/index',
                                    // })
                                }, 1500)
                            } else {
                                wx.showToast({
                                    title: res.data.msg,
                                    icon: 'none',
                                    duration: 2000
                                })
                            }
                        })

                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        })
    },

    toComment(e) {
        wx.setStorageSync('commentProduct', e.currentTarget.dataset.item); //评价商品
        wx.navigateTo({
            url: '/pages/orderComment/index?order_id=' + this.data.list_id,
        })
    },
    goJoinPink: function(e) {
        var uni = e.currentTarget.dataset.uni;
        wx.navigateTo({
            url: '/pages/productTuanDetail/index?id=' + uni,
        })
    },

    confirmOrder(e) {
        let list_id = e.currentTarget.dataset.uni;
        wx.showModal({
            title: '确认收货',
            content: '为保障权益，请收到货确认无误后，再确认收货',
            success: function(res) {
                if (res.confirm) {
                    let data = {
                        order_id: list_id
                    }
                    productModel.orderConfirm(data)
                        .then(res => {
                            if (res.code) {
                                wx.navigateTo({
                                    url: '/pages/orderList/index?nowstatus=4',
                                })
                            } else {
                                wx.showToast({
                                    title: '收货失败',
                                    icon: 'none'
                                })
                            }
                        })
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        })
    },
    goIndex: function() {
        wx.switchTab({
            url: '/pages/index/index'
        })
    },
    goAgain: function(e) {
        var that = this;
        var uni = e.currentTarget.dataset.uni;
        wx.request({
            url: app.globalData.url + '/routine/auth_api/again_order?uid=' + app.globalData.uid,
            data: {
                uni: uni
            },
            method: 'get',
            success: function(res) {
                if (res.data.code == 200) {
                    wx.navigateTo({
                        url: '/pages/order-confirm/order-confirm?id=' + res.data.data,
                    })
                } else {
                    wx.showToast({
                        title: res.data.msg,
                        icon: 'none',
                        duration: 2000
                    })
                }
            }
        });
    },

    onShow: function() {

    },

    onShareAppMessage: function() {

    }
})