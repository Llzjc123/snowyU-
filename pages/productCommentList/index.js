const app = getApp();
Page({

    data: {
        comm: 1,
        productId: '',
        uinfo: [{
            nickname:'昵称',
            comment:'很好，很强',
            add_time:'2019-06-25 12:11'
        }],
        alllength: 1,
        newlength: 1,
        piclength: 1
    },


    onLoad: function(options) {
        // var productId = options.productId;
        // this.setData({
        //     productId: productId
        // })
        //this.comment();
    },

    commentap: function(e) {
        var index = e.target.dataset.index;
        this.setData({
            comm: index
        })
        this.comment();
    },

    getImagePreview: function(e) { //图片预览
        wx.previewImage({
            current: e.currentTarget.dataset.image, // 当前显示图片的http链接
            urls: e.currentTarget.dataset.images // 需要预览的图片http链接列表
        })
    },

    onShow: function() {

    },

    onShareAppMessage: function() {

    }
})