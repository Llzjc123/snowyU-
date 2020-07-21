import {
    IndexModel
} from '../../models/index';
const app = getApp();
const indexModel = new IndexModel();
import {
    UserModel
} from '../../models/user';
const userModel = new UserModel();
Component({
    /**
     * 组件的属性列表
     */
    properties: {

    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {
        getUserInfo(event) {
            if (event.detail.userInfo) {
                let stair = wx.getStorageSync('stair')
                wx.login({
                    success: res => {
                        let data = {
                            nickname: event.detail.userInfo.nickName,
                            headimgurl: event.detail.userInfo.avatarUrl,
                            sex: event.detail.userInfo.sex ? event.detail.userInfo.sex : '',
                            city: event.detail.userInfo.city,
                            province: event.detail.userInfo.province,
                            country: event.detail.userInfo.country,
                            code: res.code,
                            stair: stair
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
                                    userInfo.realname = res.data.realname;
                                    userInfo.cate_name = res.data.cate_name;

                                    wx.setStorageSync('openid', res.data.uid);
                                    wx.setStorageSync('userInfo', userInfo);
                                    this.triggerEvent('loginSuccess', {}, {});
                                    app.getUserCartNum(() => {
                                        //获取购物车数量
                                        this.triggerEvent('loginSuccess', {}, {});
                                    });

                                } else if (res.code == 2) {
                                    wx.showToast({
                                        icon: 'none',
                                        title: '用户被禁用，请联系管理员',
                                    });
                                    setTimeout(() => {
                                        wx.navigateTo({
                                            url: '/pages/index/index',
                                        })
                                    }, 1000)
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
        }
    }
})