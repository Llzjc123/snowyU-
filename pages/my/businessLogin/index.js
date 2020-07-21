import {
    UserModel
} from '../../../models/user';
const app = getApp();
const userModel = new UserModel();

Page({
    data: {
        isLogin: false, //是否登录
    },

    onReady: function() {},

    onLoad: function(options) {},

    onShow() {
        if (wx.getStorageSync('mer_id')) {
            this.setData({
                isLogin: true
            })
        }
    },

    formSubmit(e) {
        let account = e.detail.value.account;
        let password = e.detail.value.password;
        if (!account) {
            wx.showToast({
                title: '请填写登录账号',
                icon: 'none'
            })
            return;
        }
        if (!password) {
            wx.showToast({
                title: '请填写登录密码',
                icon: 'none'
            })
            return;
        }
        userModel.storeCenterLogin(e.detail.value)
            .then(res => {
                if (res.code) {
                    let that = this;
                    wx.setStorageSync('mer_id', res.data.mer_id)
                    wx.showToast({
                        title: '登录成功',
                        icon: 'none',
                        success() {
                            that.setData({
                                isLogin: true
                            })
                        }
                    })
                } else {
                    wx.showToast({
                        title: res.data,
                        icon: 'none'
                    })
                }
            })
    },
    quitLogin() {
        wx.removeStorageSync('mer_id');
        wx.showToast({
            title: '退出成功',
            icon: 'none'
        })
        setTimeout(() => {
            wx.redirectTo({
                url: '/pages/my/businessLogin/index',
            })
        }, 500)

    },
})