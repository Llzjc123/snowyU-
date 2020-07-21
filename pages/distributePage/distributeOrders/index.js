import {
    UserModel
} from '../../../models/user';
const userModel = new UserModel();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        orderList: [],
        type: 'order'
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        let type = options.type;
        if (type == 'order') {
            userModel.getOrderProfitList()
                .then(res => {
                    this.setData({
                        orderList: res.data.resultlist
                    })
                })
        } else if (type == 'bill') {
            userModel.getOrderMoneyList()
                .then(res => {
                    this.setData({
                        orderList: res.data.resultlist
                    })
                })
            wx.setNavigationBarTitle({
                title: '分销账单',
            })
        }

        this.setData({
            type
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

    /**
     * 生命周期函数--监听页面隐藏
     */
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