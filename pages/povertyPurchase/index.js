import {
    IndexModel
} from '../../models/index';
const app = getApp();
const indexModel = new IndexModel();
Page({
    data: {
        scrollPxHeight: wx.getSystemInfoSync().windowHeight,
        purchaseList: [],
        arr: []
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
    onLoad: function() {

    },
    onShow() {
        this.getData()
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
    getData() {
        let data = {
            cid: '5'
        }
        indexModel.getNewsList(data)
            .then((res) => {
                this.setData({
                    purchaseList: res.data.resultlist
                })
            })
    },
})