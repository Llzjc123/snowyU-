import {
    NewsModel
} from '../../models/news';
const newsModel = new NewsModel();
const WxParse = require('../../wxParse/wxParse.js');
const app = getApp();
Page({
    data: {
        newsInfo: {},
        id: '',
        productList: [],
        arr: [1, 2, 3, 4],
        content: '' // 活动详情
    },
    onLoad: function(options) {
        if (options.id) {
            this.setData({
                id: options.id
            })
        }
        if (options.type == 'bm') {
            this.getBmxxinfo();
            this.setData({
                type: "bm"
            })
        } else {
            this.getData();
        }
    },
    getBmxxinfo() {
        let data = {
            id: this.data.id
        }
        newsModel.getBmxxinfo(data)
            .then(res => {
                let data = res[0];
                this.setData({
                    newsInfo: data
                })
            })
    },
    getData() {
        let data = {
            list_id: this.data.id
        }
        newsModel.getNewsinfo(data)
            .then(res => {
                this.setData({
                    newsInfo: res.data,
                    productList: res.info ? res.info : [],
                    content: res.data.content
                })
                WxParse.wxParse('content', 'html', this.data.content, this, 0);
            })
    },
    onShareAppMessage: function() {
        return {
            title: this.data.newsInfo.title,

        }
    }
})