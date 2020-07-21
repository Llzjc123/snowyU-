const app = getApp();
import {
    UserModel
} from '../../models/user';
const userModel = new UserModel();

Page({
    data: {
        userInfo: {},
        isLogin: true,
        is_show:false,
    },


    onShow: function() {
        let value = wx.getStorageSync('openid');
        if (!value) {
            this.setData({
                isLogin: false
            })
        } else {
            this.setData({
                isLogin: true,
                userInfo: wx.getStorageSync('userInfo')
            });
            userModel.getUserCenter()
                .then(res => {
                    let userinfo = this.data.userInfo;
                    userinfo.integral = res.data.userinfo.integral;
                    userinfo.now_money = res.data.userinfo.now_money;
                    this.setData({
                        payordersnum: res.data.payordersnum, //待付款数量
                        backordersnum: res.data.backordersnum, //待发货数量
                        buyerordersnum: res.data.buyerordersnum, //待收货数量
                        evaluateordersnum: res.data.evaluateordersnum, //待评价数量
                        tknum: res.data.tknum, //退款数量
                        usersignStr: res.data.usersignStr,
                        userInfo: userinfo
                    })
                    return userModel.getIsShowShop()
                })
                .then(res=>{
                    this.setData({
                        is_show:res.is_show
                    });
                })
        }
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
    loginSuccess() {
        //登录成功重新加载页面
        this.onShow();
    },

})