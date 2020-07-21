import {
    ProductModel
} from '../../models/product';
const productModel = new ProductModel();
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        url: app.globalData.urlImages,
        index: 1,
        orderId: '',
        orderlist: {},
        productlist: {},
        dataimg: [],
        hidden: false,
        array: ["收货地址填错了", "与描述不符", "信息填错了，重新拍", "商品损坏了"],
        order: []
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        if (options.orderId) {
            this.setData({
                orderId: options.orderId
            })
            this.getOrderDetail();
        }
    },

    getOrderDetail() {
        productModel.getOrderDetail({
                list_id: this.data.orderId
            })
            .then(res => {
                this.setData({
                    productlist: res.data.productlist,
                    orderlist: res.data.orderlist
                })
                wx.hideLoading();
            })

    },
    uploadpic: function(e) {
        var that = this;
        wx.chooseImage({
            count: 1, //最多可以选择的图片总数  
            sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有  
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
            success: function(res) {
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片  
                var tempFilePaths = res.tempFilePaths;
                //启动上传等待中...  
                wx.showLoading({
                    title: '图片上传中',
                })
                var len = tempFilePaths.length;
                for (var i = 0; i < len; i++) {
                    wx.uploadFile({
                        url: app.globalData.url + '/routine/auth_api/upload?uid=' + app.globalData.uid,
                        filePath: tempFilePaths[i],
                        name: 'refund',
                        formData: {
                            'filename': 'refund'
                        },
                        header: {
                            "Content-Type": "multipart/form-data"
                        },
                        success: function(res) {
                            wx.hideLoading();
                            var data = JSON.parse(res.data);
                            if (data.code == 200) {
                                that.data.dataimg.push(app.globalData.url + data.data.url);
                            }
                            that.setData({
                                dataimg: that.data.dataimg
                            });
                            var len2 = that.data.dataimg.length;
                            if (len2 >= 3) {
                                that.setData({
                                    hidden: true
                                });
                            }
                        },
                        fail: function(res) {
                            wx.showToast({
                                title: '上传图片失败',
                                icon: 'none',
                                duration: 2000
                            })
                        }
                    });
                }
            }
        });
    },

    delImg: function(e) {
        var that = this;
        that.data.dataimg.splice(e.target.dataset.index, 1);
        if (that.data.dataimg.length < 3) {
            that.setData({
                dataimg: that.data.dataimg,
                hidden: false
            })
        } else {
            that.setData({
                dataimg: that.data.dataimg
            })
        }
        wx.showToast({
            title: '删除成功',
            icon: 'success',
            duration: 2000
        })
    },

    subRefund(e) {
        if (!this.data.index) {
            wx.showToast({
                title: '请选择退款原因',
                icon: 'none',
                duration: 2000
            })
        } else {
            let data = {
                order_id: this.data.orderId,
                content: this.data.array[this.data.index] + '   特别说明:' + e.detail.value.refund_reason_wap_explain,
            }
            productModel.orderPayRefund(data)
                .then(res => {
                    if (res.code) {
                        wx.showToast({
                            title: '申请成功',
                            icon: 'success',
                            duration: 2000
                        })
                        setTimeout(() => {
                            wx.navigateTo({
                                url: '/pages/orderRefundDetail/index?type=1&order_id=' + this.data.orderId
                            })
                        }, 1000)

                    } else {
                        wx.showToast({
                            title: res.info,
                            icon: 'none',
                            duration: 2000
                        })
                    }

                })

        }
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    bindPickerChange: function(e) {
        this.setData({
            index: e.detail.value
        })
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