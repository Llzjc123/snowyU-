const app = getApp();
import {
    ProductModel
} from '../../models/product';
const productModel = new ProductModel();
import {
    getUrlParams,
    seckillTime
} from "../../utils/util.js";
Page({
    data: {
        countDownHour: '00',
        countDownMinute: '00',
        countDownSecond: '00',
        iShidden: false,
        count: 0, //还差多少人拼团完成
        isOk: 0, //是否拼团完成
        pinkAll: [], //当前拼团列表
        pinkBool: 0,
        pinkT: {}, //团长信息
        storeCombination: {}, //当前拼团产品详情
        userBool: 0, //是否为本人开团
        current_pink_order: '', //当前订单号
        userInfo: {},
        isClose: 0,
        timeEnd: false, //活动是否结束
        btnStatus: true,
    },

    onLoad: function(options) {
        //分享携带参数处理
        if (options.spid) {
            wx.setStorageSync('stair', options.spid);
        }
        this.setData({
            pinkId: options.id
        });
    },

    onLoadFun: function() {
        this.getPink();
    },

    // 打开海报页面
    getPinkPoster: function() {
        // var that = this;
        // wx.navigateTo({
        //     url: '/pages/activity/poster-poster/index?type=2&id=' + that.data.pinkId,
        // });
    },

    getPink() {
        let userInfo = wx.getStorageSync('userInfo');
        productModel.getCombinationInfo({
                list_id: this.data.pinkId
            })
            .then(res => {
                this.setData({
                    count: parseInt(res.data.pinklist.differpeople),
                    isOk: res.data.pinklist.differpeople == 0,
                    pinkAll: res.data.userlist,
                    current_pink_order: res.data.pinklist.list_id,
                    storeCombination: res.data.pinklist,
                    userBool: res.data.pinklist.is_purchase,
                    userInfo: userInfo
                });
                seckillTime(res.data.pinklist.stop_time, this);
            })
    },

    goPinkOrder(e) {
        if (this.data.btnStatus) {
            this.setData({
                btnStatus: false
            })
            app.isLogin(() => {
                let nowBuyProduct = this.data.storeCombination;
                nowBuyProduct.list_id = nowBuyProduct.combination_id;
                nowBuyProduct.cart_num = 1;
                nowBuyProduct.store_name = nowBuyProduct.title;
                nowBuyProduct.isTuan = true;
                nowBuyProduct.pink_id = this.data.pinkId;
                // nowBuyProduct.mer_id = this.data.pinkId;
                wx.setStorageSync('nowBuyProduct', nowBuyProduct);
                wx.navigateTo({
                    url: '/pages/orderConfirm/index?type=nowbuy',
                })
            })
        }

    },

    lookAll: function() {
        this.setData({
            iShidden: !this.data.iShidden
        })
    },

    onShow: function() {
        this.getPink();
        this.setData({
            btnStatus: true
        })
    },

    onHide: function() {
        this.setData({
            isClose: 1
        });
    },

    onUnload: function() {

    },

    onPullDownRefresh: function() {

    },

    onReachBottom: function() {

    },

    onShareAppMessage: function() {
        let userId = wx.getStorageSync('openid');
        return {
            title: this.data.userInfo.nickname + '邀请您参团',
            path: '/pages/productTuanDetail/index?id=' + this.data.pinkId + '&spid=' + userId,
            imageUrl: this.data.storeCombination.img_url,
            success: function() {
                // return app.Tips({
                //     title: '分享成功',
                //     icon: 'success'
                // });
            }
        };
    }
})