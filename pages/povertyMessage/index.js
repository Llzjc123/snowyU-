import {
    IndexModel
} from '../../models/index';
const app = getApp();
const indexModel = new IndexModel();
Page({
    data: {
        scrollPxHeight: wx.getSystemInfoSync().windowHeight,
        purchaseList: [],
    },
    onReady: function() {
        let height = wx.getSystemInfoSync().windowHeight;
        let width = wx.getSystemInfoSync().windowWidth;
        let searchHeight = 210 / (750 / width);
        let scrollPxHeight = height - searchHeight;
        this.setData({
            scrollPxHeight
        })
    },
    onLoad: function(options) {

    },
    onShow() {
        this.getData();
    },
    getData() {
        console.log(this.options)
        let data = {

        }
        if (this.options.type) data.type = this.options.type;
        indexModel.getNewsMessageList(data)
            .then((res) => {
                this.setData({
                    purchaseList: res.data
                })
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

    }
})