import {
    IndexModel
} from '../../models/index';
import {
    againGroup
} from '../../utils/util.js';
const app = getApp();

const indexModel = new IndexModel();
Page({
    data: {
        scrollPxHeight: wx.getSystemInfoSync().windowHeight,
        banner: {},
        bm: [],
        gr: [],
        showMore1: true,
        showMore2: true,
    },
    onLoad: function() {

    },
    onShow() {
        this.getGXZList();
    },
    getGXZList() {
        indexModel.getGXZList()
            .then(res => {
                let bm = res.bm;
                let gr = res.gr;
                bm.map((val) => {
                    val.gx = Number(val.gx).toFixed(2)
                })
                gr.map((val) => {
                    val.gx = Number(val.gxz).toFixed(2)
                })
                this.setData({
                    bm: bm,
                    gr: gr,
                    arr1: againGroup(res.bm, 10)[0],
                    arr2: againGroup(res.gr, 10)[0],
                })

                return indexModel.getFptp()
                    .then(res => {
                        this.setData({
                            banner: res
                        })
                    })
            })
    },
    getMore1() {
        this.setData({
            arr1: this.data.bm,
            showMore1: false
        })
    },
    getMore2() {
        this.setData({
            arr2: this.data.gr,
            showMore2: false
        })
    },
    toLink(e) {
        let name = e.currentTarget.dataset.item.name;
        let url = e.currentTarget.dataset.item.url;
        let reg = url.indexOf('pid');
        url = reg == -1 ? url : url + '&name=' + name;
        if (name == '所有产品') {
            wx.switchTab({
                url: '/pages/classify/classify',
            })
        } else {
            wx.navigateTo({
                url: url,
            });
        }
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
    onPullDownRefresh: function() {
        // 显示顶部刷新图标
        wx.showNavigationBarLoading();
        setTimeout(() => {
            wx.hideNavigationBarLoading();
            // 停止下拉动作
            wx.stopPullDownRefresh();

        }, 500)
    },
})