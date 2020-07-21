const app = getApp();
import {
    ProductModel
} from '../../models/product';
const productModel = new ProductModel();
const limit = 10;
Page({

    data: {
        url: app.globalData.urlImages,
        nowstatus: 0, //4为已完成
        orderlist: [],
        loading: true,
        endFlag: 1, //是否有数据0是没有
        pageNo: 1,
        moreLoading: false,
    },

    onLoad: function(options) {
        //console.log(options.nowstatus)

    },

    onShow() {
        if (parseInt(this.options.nowstatus)) {
            this.setData({
                orderlist: [],
                loading: true,
                nowstatus: this.options.nowstatus
            })
            this.getorderlist(parseInt(this.options.nowstatus));
        } else {
            this.setData({
                loading: true,
                orderlist: [],
            })
            this.getorderlist(0);
        }
    },

    getorderlist() {
        let data = {
            status: this.data.nowstatus,
            page: this.data.pageNo,
            limit: limit
        }
        productModel.getOrderList(data)
            .then(res => {
                let arr = [];
                let obj = res.data.resultlist;
                let objkey = Object.keys(obj);
                for (let i in objkey) {
                    arr.push(obj[objkey[i]]);
                }
                this.setData({
                    loading: false,
                    [`orderlist[${this.data.orderlist.length}]`]: arr,
                    endFlag: res.data.pagelist.page < res.data.pagelist.pages ? 1 : 0
                })
            })

    },

    statusClick: function(e) {
        let nowstatus = e.currentTarget.dataset.show;
        this.setData({
            nowstatus: nowstatus,
            orderlist: [],
            loading: true,
            pageNo: 1,
        });
        this.getorderlist();
    },

    onReachBottom() {
        if (this.data.endFlag == 1 && !this.data.moreLoading) {
            this.setData({
                moreLoading: true
            });
            let data = {
                status: this.data.nowstatus,
                page: this.data.pageNo + 1,
                limit: limit
            };
            productModel.getOrderList(data)
                .then(res => {
                    let arr = [];
                    let obj = res.data.resultlist;
                    let objkey = Object.keys(obj);
                    for (let i in objkey) {
                        arr.push(obj[objkey[i]]);
                    }
                    this.setData({
                        [`orderlist[${this.data.orderlist.length}]`]: arr,
                        endFlag: res.data.pagelist.page < res.data.pagelist.pages ? 1 : 0,
                        moreLoading: false,
                        pageNo: res.data.pagelist.page
                    })
                })
        } 
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
    shouhuo(e) {
        let list_id = e.currentTarget.dataset.id;
        wx.showModal({
            title: '确认收货',
            content: '为保障权益，请收到货确认无误后，再确认收货',
            success: function(res) {
                if (res.confirm) {
                    let data = {
                        order_id: list_id
                    }
                    productModel.orderConfirm(data)
                        .then(res => {
                            if (res.code) {
                                wx.navigateTo({
                                    url: '/pages/orderList/index?nowstatus=4',
                                })
                            } else {
                                wx.showToast({
                                    title: '收货失败',
                                    icon: 'none'
                                })
                            }
                        })
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        })
    }
})