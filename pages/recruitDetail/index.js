import {
    NewsModel
} from '../../models/news';
const newsModel = new NewsModel();
const WxParse = require('../../wxParse/wxParse.js');
const app = getApp();
Page({
    data: {
        scrollPxHeight: wx.getSystemInfoSync().windowHeight
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
        if (options.id) {
            this.setData({
                id: options.id
            })
        }
        this.getData();
    },
    getData() {
        let data = {
            list_id: this.data.id
        }
        newsModel.getNewsinfo(data)
            .then(res => {
                this.setData({
                    newsInfo: res.data,
                    content: res.data.content
                })
                WxParse.wxParse('content', 'html', this.data.content, this, 0);
            })
    }
})