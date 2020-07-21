import {
    MyModel
} from '../../../models/my.js';
const myModel = new MyModel();
import {
    api_base_url,
    upload_img_base_url
} from '../../../config.js'
const app = getApp();
Page({
    data: {
        valueNumber: 0,
        imagePaths: "",
        tempFileSrc: "",
        values: "",
        btnStatus: true, //防重复点击
        type: 0,
    },

    onLoad: function(options) {
        this.setData({
            type: options.type
        });
        if (options.type) {
            if (options.type == 1) {
                wx.setNavigationBarTitle({
                    title: '便民信息',
                })
            } else {
                wx.setNavigationBarTitle({
                    title: '留言反馈',
                })
            }
        }
    },

    onInput(e) {
        this.setData({
            values: e.detail.value
        });
    },

    chooseImage() {
        let that = this;
        wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success(res) {
                // tempFilePath可以作为img标签的src属性显示图片
                const tempFilePaths = res.tempFilePaths;
                wx.uploadFile({
                    url: api_base_url + 'user/leave_fk',
                    filePath: tempFilePaths[0],
                    name: 'file',
                    formData: {},
                    success(res) {
                        let data = JSON.parse(res.data);
                        that.setData({
                            imagePaths: upload_img_base_url + data.data,
                            tempFileSrc: upload_img_base_url + data.data
                        });
                    }
                })


            }
        });
    },
    delete(){
        this.setData({
            imagePaths:'',
            tempFileSrc: ''
        }); 
    },
    onBind() {
        if (this.data.btnStatus) {
            if (!this.data.values) {
                wx.showToast({
                    title: '请填写内容！',
                    icon: 'none',
                    duration: 2000
                })
                return;
            }
            let data = {
                img_url: this.data.tempFileSrc,
                content: this.data.values,
                type: this.data.type
            }
            this.setData({
                btnStatus: false
            });
            myModel.userFeedBack(data)
                .then(res => {
                    wx.showToast({
                        title: '提交成功',
                        success() {
                            setTimeout(function() {
                                wx.navigateBack();
                            }, 1500)
                        }
                    });
                    this.setData({
                        btnStatus: true
                    });
                });

        }
    },

    onShow: function() {

    },
})