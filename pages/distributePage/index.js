import {
    UserModel
} from '../../models/user';
const userModel = new UserModel();
const app = getApp();
const WxParse = require('../../wxParse/wxParse.js');
Page({
    data: {
        ktx: 0,
        wjs: 0,
        tx: 0,
        product: [],
        hiddenbnModal: true,
        info: ''
    },
    onLoad: function(options) {
        userModel.getMyStoreData()
            .then(res => {
                this.setData({
                    ktx: res.data.ktx,
                    wjs: res.data.wjs,
                    tx: res.data.tx,
                    product: res.data.product
                })
                return userModel.fenxiaoInfo()
            })
            .then(res => {
                this.setData({
                    info: res.value
                })
                WxParse.wxParse('description', 'html', this.data.info, this, 0);
            })
    },
    toLink() {
        wx.navigateTo({
            url: '/pages/promotionCard/index',
        })
    },
    showModal() {
        this.setData({
            hiddenbnModal: false
        });
    },

    hiddenModal() {
        this.setData({
            hiddenbnModal: true
        });
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
    applyDistribute() {
        wx.showModal({
            title: '确定要申请分销商吗？',
            content: '注：分销商的信息以用户登录信息为准。',
            cancelText: '我再想想',
            // cancelColor: '#b5b5b5',
            confirmText: '确定申请',
            // confirmColor: '#f8614a"',
            success(res) {
                if (res.confirm) {
                    userModel.userApply()
                        .then(res => {
                            if (res.code) {
                                wx.showToast({
                                    title: '申请成功',
                                    icon: 'none'
                                })
                            } else {
                                wx.showToast({
                                    title: res.info,
                                    icon: 'none'
                                })
                            }
                        })
                    console.log('用户点击确定')
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        })
    }
})