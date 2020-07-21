import {
    UserModel
} from '../../models/user';
const app = getApp();
const userModel = new UserModel();
Page({

    data: {
        userinfo: {},
        code_img: ''
    },

    onShow: function() {
        app.isLogin(() => {
            this.setData({
                userinfo: wx.getStorageSync('userInfo')
            })
            wx.showLoading({
                title: '二维码生成中',
            })
            userModel.getQRCode()
                .then(res => {
                    wx.hideLoading();
                    this.setData({
                        code_img: res.data.img_url
                    })
                })
        })

    },

    saveImg(e) {
        //保存图片
        wx.getSetting({
            success: function(res) {
                wx.authorize({
                    scope: 'scope.writePhotosAlbum',
                    success: function(res) {
                        let imgUrl = e.target.dataset.src; //图片地址
                        wx.downloadFile({
                            url: imgUrl,
                            success: function(res) {
                                wx.showToast({
                                    title: '已保存到手机相册',
                                    icon: 'success',
                                    duration: 1000
                                })
                                // 下载成功后再保存到本地
                                wx.saveImageToPhotosAlbum({
                                    filePath: res.tempFilePath,
                                    success: function(res) {}
                                })
                            }
                        })
                    }
                })
            }
        })
    },

    onReady: function() {

    },



    onHide: function() {

    },

    onUnload: function() {

    },

    onPullDownRefresh: function() {

    },

    onReachBottom: function() {

    },


})