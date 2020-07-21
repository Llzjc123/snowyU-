import {
    MyModel
} from '../../../models/my';
const app = getApp();
const myModel = new MyModel();
Page({
    data: {
        scrollPxHeight: wx.getSystemInfoSync().windowHeight,
        navList: ['未使用', '已使用', '已失效'],
        activeItem: 0,
        noUseCouponList: [],
        hasUseCouponList: [],
        timeCouponList: [],
    },

    onReady: function() {
        let height = wx.getSystemInfoSync().windowHeight;
        let width = wx.getSystemInfoSync().windowWidth;
        let searchHeight = 80 / (750 / width);
        let scrollPxHeight = height - searchHeight;
        this.setData({
            scrollPxHeight
        })
    },

    onLoad: function(options) {},

    onShow() {
        this.getData()
    },
    onPullDownRefresh: function () {
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
            status: this.data.activeItem
        }
        myModel.myCouponList(data)
            .then(res => {
                switch (this.data.activeItem) {
                    case 0:
                        this.setData({
                            noUseCouponList: res.data.resultlist
                        });
                        break;
                    case 1:
                        this.setData({
                            hasUseCouponList: res.data.resultlist
                        });
                        break;
                    case 2:
                        this.setData({
                            timeCouponList: res.data.resultlist
                        });
                        break;
                }

            })
    },

    change(e) {
        let index = e.currentTarget.dataset.index;
        this.setData({
            activeItem: index
        });
        this.getData()
    },

    toStore(e) {
        let id = e.currentTarget.dataset.id;
        if (id != 0) {
            wx.navigateTo({
                url: '/pages/shopPage/index?id=' + id,
            })
        } else {
            wx.switchTab({
                url: '/pages/index/index',
            })
        }

    }
})