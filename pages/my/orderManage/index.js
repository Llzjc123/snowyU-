import {
    UserModel
} from '../../../models/user';

const app = getApp();
const userModel = new UserModel();

Page({
    data: {
        merid: 0,
        orderList: [],
    },

    onReady: function () { },

    onLoad: function (options) {


    },

    onShow() {
        let merid = wx.getStorageSync('mer_id');
        let data = {
            mer_id: merid
        }
        userModel.getUserStoreList(data)
            .then(res => {
                this.setData({
                    orderList: res.data.resultlist
                })
            })
    },

    payOrder(e) {
        wx.navigateTo({
            url: '/pages/my/payOrder/index?id=' + e.currentTarget.dataset.id,
        })
    },

    tuikuan(e) {
        let data = {
            id: e.currentTarget.dataset.id,
            order_id: e.currentTarget.dataset.orderid,
            refund_price: e.currentTarget.dataset.price,
            
            // status: -1,
        }
        wx.showModal({
            title: '提示',
            content: '确认同意退款吗',
            success(res) {
                if (res.confirm) {
                    userModel.storeTuikuan(data)
                        .then(res => {
                            if (res.code) {
                                wx.showToast({
                                    title: '操作成功',
                                })
                                this.onShow();
                            } else {
                                wx.showToast({
                                    title: res.data,
                                })
                            }

                        })
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        })


    }

})