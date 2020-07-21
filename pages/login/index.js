import {
    IndexModel
} from '../../models/index';
const app = getApp();
const indexModel = new IndexModel();
import {
    UserModel
} from '../../models/user';
const userModel = new UserModel();

Page({
    data: {
        pages: []
    },
    onShow: function() {
        this.setData({
            pages: getCurrentPages()
        })
        if (wx.getStorageSync('openid')) {
            if (this.data.pages.length > 1) {
                wx.navigateBack()
            } else {
                wx.switchTab({
                    url: '/pages/index/index',
                })
            }
        }
    },

    getUserInfo(event) {
        if (event.detail.userInfo) {
            let stair = wx.getStorageSync('stair')
            wx.login({
                success: res => {
                    let data = {
                        nickname: event.detail.userInfo.nickName,
                        headimgurl: event.detail.userInfo.avatarUrl,
                        sex: event.detail.userInfo.sex,
                        city: event.detail.userInfo.city,
                        province: event.detail.userInfo.province,
                        country: event.detail.userInfo.country,
                        code: res.code,
                        stair: stair //推荐人id，
                    }

                    let userInfo = {
                        nickname: event.detail.userInfo.nickName,
                        headimgurl: event.detail.userInfo.avatarUrl
                    }
                    userModel.userLogin(data)
                        .then(res => {
                            if (res.code == 1) {
                                userInfo.now_money = res.data.now_money;
                                userInfo.user_integral = res.data.user_integral;
                                wx.setStorageSync('openid', res.data.uid);
                                wx.setStorageSync('userInfo', userInfo);

                                app.getUserCartNum(() => {
                                    //获取购物车数量
                                    if (this.data.pages.length > 1) {
                                        wx.navigateBack()
                                    } else {
                                        wx.switchTab({
                                            url: '/pages/index/index',
                                        })
                                    }
                                });

                            } else if (res.code == 2) {
                                wx.showToast({
                                    icon: 'none',
                                    title: '用户被禁用，请联系管理员',
                                });
                                wx.navigateBack()
                            } else {
                                wx.showToast({
                                    icon: 'none',
                                    title: '授权登录失败',
                                });
                            }

                        })

                }
            });
        } else {
            wx.switchTab({
                url: '/pages/index/index',
            })
        }

    },

    cancel() {
        wx.switchTab({
            url: '/pages/index/index',
        })
    },
    onUnload: function() { //如果页面被卸载时被执行
        //    wx.switchTab({
        //        url: '/pages/index/index',
        //    })
    },

})