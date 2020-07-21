import {
    CartModel
} from '../../../models/cart';
const app = getApp();
const cartModel = new CartModel();
Page({
    data: {
        collectionList: []
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
    onShow: function() {
        cartModel.getCollectList()
            .then(res => {
                this.setData({
                    collectionList: res.data.resultlist
                })
            })
    },



})