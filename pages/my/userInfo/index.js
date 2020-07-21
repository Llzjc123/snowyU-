const app = getApp();
import {
    UserModel
} from '../../../models/user';

const userModel = new UserModel();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        array: [],
        index: 0,
        name: '',
        userInfo: {},
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        let userInfo = wx.getStorageSync('userInfo');
        this.setData({
            userInfo,
            name: userInfo.realname ? userInfo.realname : '',
            cate_name: userInfo.cate_name ? userInfo.cate_name : '',
        })
        userModel.getUnitSign()
            .then(res => {
                this.setData({
                    array: res.data
                })
            })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    bindPickerChange: function(e) {
        this.setData({
            index: e.detail.value,
        })
    },

    inputChange(event) {
        this.setData({
            name: event.detail.value
        });
    },

    submit() {
        if (!this.data.name) {
            wx.showToast({
                title: '请填写您的姓名',
                icon: 'none'
            })
            return;
        }
        let array = this.data.array;
        let index = this.data.index;
        let routine_openid = wx.getStorageSync('openid');
        let params = {
            routine_openid: routine_openid,
            cate_name: array[index].cate_name,
            realname: this.data.name,
        }
        userModel.updateUserInfo(params)
            .then(res => {
                if (res.code) {
                    wx.showToast({
                        title: '完善成功',
                    });
                    let userInfo = wx.getStorageSync('userInfo');
                    userInfo.realname = res.realname;
                    userInfo.cate_name = res.cate_name;
                    wx.setStorageSync('userInfo', userInfo);
                    this.onLoad();
                } else {
                    wx.showToast({
                        title: res.info,
                        icon: 'none'
                    })
                }
            })
    },

    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})