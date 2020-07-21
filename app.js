import {
    CartModel
} from '/models/cart';

const cartModel = new CartModel();
App({
    onLaunch: function() {

    },

    onShow: function() {
        //从后台到前台


    },

    onHide: function() {
        //小程序从前台到后台

    },

    isLogin(callback) {
        let value = wx.getStorageSync('openid');
        if (value) {
            callback && callback(value);
        } else { //重新登录
            wx.navigateTo({
                url: '/pages/login/index',
            });
        }
    },

    getUserCartNum(callback) {
        //获取购物车数量
        let value = wx.getStorageSync('openid');
        if (value) {
            cartModel.getCartNum()
                .then(res => {
                    wx.setStorageSync('cartNum', res.data.cartnums);
                    callback && callback();
                });
        }
    },

    globalData: {
        cartNum: 0, //购物车数量
    }
})