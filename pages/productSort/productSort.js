import {
    IndexModel
} from '../../models/index';
const indexModel = new IndexModel();
const limit = 10;
const app = getApp();
Page({
    data: {
        cateId: 0,
        arr: [],
        activityTitle: ''
    },
    onLoad: function(options) {
        let cateId = options.pid ? options.pid : 0;
        let title = options.name ? options.name : '';
        this.setData({
            cateId: cateId
        })
        wx.setNavigationBarTitle({
            title: title
        });

    },
    onShow() {
        this.getData();
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
            cate_id: this.data.cateId,
            limit: limit
        }
        indexModel.getGoodsList(data)
            .then(res => {
                this.setData({
                    arr: res.data.resultlist
                })
            })
    }


})