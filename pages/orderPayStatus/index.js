const app = getApp();
import {
    ProductModel
} from '../../models/product';
const productModel = new ProductModel();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        parameter: {
            'navbar': '1',
            'return': '1',
            'title': '支付成功'
        },
        orderId: '',
        order_pay_info: {
            paid: 1
        },
        totalPrice:0
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.setData({
            orderId: options.order_id,
            status: options.status || 0,
            msg: options.msg || ''
        });
        this.getOrderPayInfo();
    },

    getOrderPayInfo() {
        var that = this;
        wx.showLoading({
            title: '正在加载中'
        });
        productModel.getOrderDetail({
                list_id: this.data.orderId
            })
            .then(res => {
                this.setData({
                    order_pay_info: res.data.orderlist,
                    totalPrice: Number(res.pay_price) + Number(res.total_postage),
                    'parameter.title': res.data.orderlist.paid ? '支付成功' : '支付失败'
                });
                wx.hideLoading();
            })

    },




})