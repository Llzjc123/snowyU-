import {
    IndexModel
} from '../../models/index';
import {
    againGroup
} from '../../utils/util.js';
const indexModel = new IndexModel();
const app = getApp();
const limit = 10;
Page({
    data: {
        loading: false,
        historyWords: [],
        hotKeyList: [{
            name: '当季蓝莓'
        }],
        defaultKeyword: '盐', //默认输入框搜索字
        product: [],
        store: [],
        q: '',
        pageNo: 1,
        moreLoading: false,
        endFlag: 1, //是否有下一页0没有
        navShowIndex: 0,
    },

    onLoad: function(options) {
        if (options.word) {
            this.setData({
                q: options.word
            });
            this.goSearch();
        }
        //this.getHotKey();

    },

    onReady: function() {
        let height = wx.getSystemInfoSync().windowHeight; //设备可视高度
        let width = wx.getSystemInfoSync().windowWidth; //设备可视宽度
        let scrollPxHeight = height; //滚动区域高度(px)
        //console.log(scrollPxHeight);
        this.setData({
            scrollPxHeight
        });

    },

    onShow: function() {

    },

    getHotKey() {
        indexModel.getHotKey()
            .then(res => {
                this.setData({
                    hotKeyList: res.data
                })
            })
    },

    inputChange(event) {
        this.setData({
            q: event.detail.value
        });
    },

    goSearch(e) {
        if (e && e.currentTarget.dataset.word) {
            this.setData({
                q: e.currentTarget.dataset.word
            });
        }
        let data = {
            keys: this.data.q ? this.data.q : this.data.defaultKeyword,
            pageNo: 1,
            // limit: limit
        };
        this.setData({
            loading: true,
        });
        indexModel.getSearchData(data)
            .then(res => {
                this.setData({
                    product: res.product,
                    store: res.store,
                    loading: false,

                })
            })
    },

    onReachBottom() {
        // if (this.data.endFlag == 1 && !this.data.moreLoading) {
        //     this.setData({
        //         moreLoading: true
        //     });
        //     let data = {
        //         keyword: this.data.q ? this.data.q : this.data.defaultKeyword,
        //         page: this.data.pageNo + 1,
        //         limit: limit
        //     };
        //     indexModel.getProductList(data)
        //         .then(res => {
        //             this.setData({
        //                 [`productList[${this.data.productList.length}]`]: res.data.resultlist,
        //                 endFlag: res.data.pagelist.page < res.data.pagelist.pages ? 1 : 0,
        //                 moreLoading: false,
        //                 pageNo: res.data.pagelist.page
        //             })
        //         })
        // }
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
    navShowIndexChange(e) {
        this.setData({
            navShowIndex: e.currentTarget.dataset.index
        });
    },
})