import {
    IndexModel
} from '../../models/index';
const app = getApp();
const indexModel = new IndexModel();
Page({
    data: {
        scrollPxHeight: wx.getSystemInfoSync().windowHeight,
        dynamicsList: [],
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
    getData() {
        let data = {
            cid: '7'
        }
        indexModel.getNewsList(data)
            .then((res) => {
                this.setData({
                    dynamicsList: res.data.resultlist
                })
            });
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
    linkToDetail(e) {
        let id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '/pages/povertyActivity/index?id=' + id,
        })
    }
})