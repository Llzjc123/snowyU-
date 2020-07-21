import {
    UserModel
} from '../../../models/user';
const app = getApp();
const userModel = new UserModel();
Page({
    data: {
        _num: '', //选中的默认地址
        orderId: '',
        pinkId: '',
        couponId: '',
        addressArray: []
    },

    onLoad: function(options) {
        if (options.orderId) {
            this.setData({
                orderId: options.orderId
            })
        }
    },

    onShow() {
        this.getAddress();
    },

    getAddress: function() {
        userModel.getAddressList()
            .then(res => {
                this.setData({
                    addressArray: res.data.resultlist
                })
            })
    },

    addAddress: function() {
        // var cartId = this.data.cartId;
        // var pinkId = this.data.pinkId;
        // var couponId = this.data.couponId;
        // this.setData({
        //     cartId: '',
        //     pinkId: '',
        //     couponId: '',
        // })
        if (this.data.orderId) {
            let url = '/pages/my/myAddAddress/index?type=add&orderId=' + this.data.orderId;
            if (this.options.coupon == 'select') {
                url = url + '&coupon=select'
            }
            if (this.options.type == 'nowbuy') {
                url = url + '&type=nowbuy';
            }
            wx.navigateTo({
                url
            })
        } else {
            wx.navigateTo({
                url: '/pages/my/myAddAddress/index?type=add'
            })
        }

    },

    goOrder(e) {
        if (this.data.orderId) {
            let selectAddress = e.currentTarget.dataset.item;
            wx.setStorageSync('selectAddress', selectAddress);
            let url = '/pages/orderConfirm/index?id=' + this.data.orderId + '&address=select';
            if (this.options.coupon == 'select') {
                url = url + '&coupon=select'
            }
            if (this.options.type == 'nowbuy') {
                url = url + '&type=nowbuy';
            }
            wx.navigateTo({
                url
            })
        }

    },

    delAddress(e) {
        let id = e.currentTarget.dataset.id;
        let data = {
            list_id: id,
            types: 2
        }
        userModel.setDefault(data)
            .then(res => {
                if (res.code) {
                    wx.showToast({
                        title: '删除成功',
                        icon: 'success',
                        duration: 1000,
                    });
                    this.onShow();
                } else {
                    wx.showToast({
                        title: '删除失败',
                        icon: 'none',
                        duration: 1000,
                    })
                }
            })

    },

    editAddress: function(e) {
        wx.setStorageSync('editAddress', e.currentTarget.dataset.data)
        wx.navigateTo({
            url: '/pages/my/myAddAddress/index?type=edit'
        })
    },

    activetap(e) {
        //设为默认地址
        let id = e.currentTarget.dataset.idx;
        let data = {
            list_id: id,
            types: 1
        }
        userModel.setDefault(data)
            .then(res => {
                if (res.code) {
                    wx.showToast({
                        title: '设置成功',
                        icon: 'success',
                        duration: 1000,
                    });
                    this.onShow();
                } else {
                    wx.showToast({
                        title: '设置失败',
                        icon: 'none',
                        duration: 1000,
                    })
                }
            })


    }
})