const app = getApp();
import {
    MyModel
} from '../../models/my';
import {
    IndexModel
} from '../../models/index';
const myModel = new MyModel();
const indexModel = new IndexModel();
Page({

    data: {
        myCouponList: [],
        type: 0,
        loading: false,
        orderId: 0, //从订单页面进来选择优惠券
        merId: 0
    },

    onLoad: function(options) {
        if (options.type == 1) {
            this.setData({
                type: 1
            })
            wx.setNavigationBarTitle({
                title: '领券',
            })
            let data = {
                mer_id: options.merId
            };
            indexModel.getCouponList(data)
                .then(res => {
                    this.setData({
                        loading: true,
                        myCouponList: res.data.resultlist
                    })
                })
        } else {
            wx.setNavigationBarTitle({
                title: '选择优惠券',
            })
            let data = {};
            if (options.money) {
                data.price = options.money
                data.mer_id = options.merId
                data.status = 0
            }
            myModel.myCouponList(data)
                .then(res => {
                    this.setData({
                        loading: true,
                        myCouponList: res.data.resultlist.coupon ? res.data.resultlist.coupon : []
                    })
                })
        }


    },


    onShow: function() {

    },

    getCoupon(e) {
        app.isLogin(() => {
            let list_id = e.currentTarget.dataset.id;
            if (this.options.orderId) {
                let selectCoupon = e.currentTarget.dataset.item;
                wx.setStorageSync('selectCoupon', selectCoupon);
                let url = '/pages/orderConfirm/index?orderId=' + this.options.orderId + '&merId=' + this.options.merId + '&coupon=select';
                if (this.options.address == 'select') {
                    url = url + '&address=select'
                }
                if (this.options.type == 'nowbuy') {
                    url = url + '&type=nowbuy';
                }
                wx.navigateTo({
                    url
                })
            } else if (this.data.type) {
                indexModel.getCoupon({
                        list_id: list_id
                    })
                    .then(res => {
                        if (res.code) {
                            wx.showToast({
                                title: '领取成功'
                            })
                        } else {
                            wx.showToast({
                                icon: 'none',
                                title: res.info,
                            })
                        }

                    })
            }
        })

    },
})