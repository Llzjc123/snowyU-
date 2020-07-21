const app = getApp();
import {
    ProductModel
} from '../../models/product';
const productModel = new ProductModel();
let order_id = 0;
Page({
    data: {
        xinghidden: true,
        xinghidden2: true,
        xinghidden3: true,
        url: '',
        hidden: false,
        unique: '',
        uni: '',
        dataimg: [],
        listInfo: [],
    },

    onLoad: function(options) {
        order_id = options.order_id;
        productModel.getOrderDetail({
                list_id: order_id
            })
            .then(res => {
                this.setData({
                    listInfo: res.data.productlist
                })
                console.log(this.data.listInfo)
                wx.hideLoading();
            })

        // this.setData({
        //     product: wx.getStorageSync('commentProduct')
        // });
    },


    tapxing(e) {
        let index = e.target.dataset.index;
        let idx = e.target.dataset.idx;
        let arr = this.data.listInfo;
        arr[idx].xing = index;
        arr[idx].xinghidden = false;
        this.setData({
            listInfo: arr
        })
    },

    tapxing2(e) {
        let index = e.target.dataset.index;
        let idx = e.target.dataset.idx;
        let arr = this.data.listInfo;
        arr[idx].xing2 = index;
        arr[idx].xinghidden2 = false;
        this.setData({
            listInfo: arr
        })
    },

    tapxing3(e) {
        var index = e.target.dataset.index;
        this.setData({
            xinghidden3: false,
            xing3: index
        })
    },

    delImages: function(e) {
        var that = this;
        var dataimg = that.data.dataimg;
        var index = e.currentTarget.dataset.id;
        dataimg.splice(index, 1);
        that.setData({
            dataimg: dataimg
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
                        name: 'pics',
                        formData: {
                            'filename': 'pics'
                        },
                        header: {
                            "Content-Type": "multipart/form-data"
                        },
                        success: function(res) {
                            wx.hideLoading();
                            if (res.statusCode == 403) {
                                wx.showToast({
                                    title: res.data,
                                    icon: 'none',
                                    duration: 1500,
                                })
                            } else {
                                var data = JSON.parse(res.data);
                                data.data.url = app.globalData.url + data.data.url;
                                that.data.dataimg.push(data);
                                that.setData({
                                    dataimg: that.data.dataimg
                                });
                                var len2 = that.data.dataimg.length;
                                if (len2 >= 8) {
                                    that.setData({
                                        hidden: true
                                    });
                                }
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

    formSubmit(e) {
        let comment = e.detail.value;
        let arr = this.data.listInfo;
        let submitinfo = [];
        for (let index in arr) {
            let i = 'comment' + index;
            if (comment[i] == '') {
                wx.showToast({
                    title: '请填写你对宝贝的心得！',
                    icon: 'none',
                    duration: 2000
                })
                return;
            }
            if (!arr[index].xing2 || !arr[index].xing) {
                wx.showToast({
                    title: '请对商品进行评分！',
                    icon: 'none',
                    duration: 2000
                })
                return;
            }
            let obj = {
                comment: comment[i],
                service_score: arr[index].xing2,
                product_score: arr[index].xing,
                product_id: arr[index].product_id,
                product_unique: arr[index].product_attr_unique ? arr[index].product_attr_unique : ''
            }
            submitinfo.push(obj);
        }

        let data = {
            order_id: order_id,
            product: JSON.stringify(submitinfo)
        }
        wx.showLoading({
            title: "正在发布评论……"
        });
        productModel.orderComment(data)
            .then(res => {
                wx.hideLoading();
                if (res.code == 1) {
                    wx.showToast({
                        title: '评价成功',
                        icon: 'success',
                        duration: 1000
                    })
                    setTimeout(function() {
                        wx.navigateTo({
                            url: '/pages/orderDetail/index?order_id=' + order_id,
                        })
                    }, 1200)
                }

            })

        // var pics = [];
        // var dataimg = that.data.dataimg;
        // for (var i = 0; i < dataimg.length; i++) {
        //     pics.push(that.data.url + dataimg[i].data.url)
        // };
    },

    onShareAppMessage: function() {

    }
})