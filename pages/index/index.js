import {
    IndexModel
} from '../../models/index';
import {
    againGroup,
    getUrlParams
} from '../../utils/util.js';
const app = getApp();
const indexModel = new IndexModel();
const limit = 10;
Page({
    data: {
        scrollPxHeight: wx.getSystemInfoSync().windowHeight,
        indicatorDots: false,
        autoplay: true,
        interval: 4000,
        duration: 500,
        loading: false,
        endFlag: 1, //是否有数据0是没有
        pageNo: 1,
        moreLoading: false,
        bannerList: [],
        navOneList: [],
        navHotList: [],
        productList: [],
        newsList: [],
        hdList: [],
        moreLoading: false
    },
    onLoad: function(options) {
        if (options.scene) {
            let value = getUrlParams(decodeURIComponent(options.scene));
            let spid = value.ucodeId;
            wx.setStorageSync('stair', spid);
        }
        this.getIndexData();
    },
    onReady: function() {
        let height = wx.getSystemInfoSync().windowHeight;
        let width = wx.getSystemInfoSync().windowWidth;
        let searchHeight = 110 / (750 / width);
        let scrollPxHeight = height - searchHeight;
        this.setData({
            scrollPxHeight
        })
    },
    getIndexData(callback) {
        indexModel.getIndexData()
            .then(res => {
                this.setData({
                    bannerList: res.banner,
                    navOneList: res.data,
                    navHotList: res.info,
                    hdList: res.hd
                });
                let data = {
                    page: 1,
                    is_index: 1,
                    limit: limit
                }
                return indexModel.getGoodsList(data)
            })
            .then(res => {
                this.setData({
                    [`productList[${this.data.productList.length}]`]: res.data.resultlist,
                    endFlag: res.data.pagelist.page < res.data.pagelist.pages ? 1 : 0
                })
                return indexModel.getNewsList()
            })
            .then(res => {
                this.setData({
                    loading: true,
                    newsList: againGroup(res.data.resultlist, 2)
                });
                callback && callback();
            })
    },
    onReachBottom() {
        if (this.data.endFlag == 1 && !this.data.moreLoading) {
            this.setData({
                moreLoading: true
            });
            let data = {
                page: this.data.pageNo + 1,
                is_index: 1,
                limit: limit
            };
            indexModel.getGoodsList(data)
                .then(res => {
                    this.setData({
                        [`productList[${this.data.productList.length}]`]: res.data.resultlist,
                        endFlag: res.data.pagelist.page < res.data.pagelist.pages ? 1 : 0,
                        moreLoading: false,
                        pageNo: res.data.pagelist.page
                    })
                })
        }
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
    toPage(e) {

    },
    onPullDownRefresh: function() {
        // 显示顶部刷新图标
        wx.showNavigationBarLoading();
        var that = this;
        this.setData({
            page: 1,
            productList: [],
            endFlag: 1, //是否有数据0是没有
            pageNo: 1,
            moreLoading: false,
            bannerList: [],
            navOneList: [],
            navHotList: [],
            newsList: [],
            hdList: []

        })
        this.getIndexData(() => {
            wx.hideNavigationBarLoading();
            // 停止下拉动作
            wx.stopPullDownRefresh();

        })
    },
    onShareAppMessage: function() {

    }
})