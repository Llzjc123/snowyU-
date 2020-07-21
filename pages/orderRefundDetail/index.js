const app = getApp();
import {
    ProductModel
} from '../../models/product';
const productModel = new ProductModel();
Page({

    data: {
        orderId: '',
        orderlist: {},
        productlist:[],
    },

    onLoad: function(options) {
        if (options.order_id) {
            this.setData({
                orderId: options.order_id
            })
            this.getOrder();
        }
    },

    onReady: function() {

    },

    getOrder: function() {
        productModel.getOrderDetail({
                list_id: this.data.orderId
            })
            .then(res => {
                this.setData({
                    orderlist: res.data.orderlist,
                    productlist: res.data.productlist
                })
                wx.hideLoading();
            })
    },

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

})