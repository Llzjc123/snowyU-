import {
    UserModel
} from '../../../models/user';
const app = getApp();
const userModel = new UserModel();
Page({
    data: {
        _num: 1,
        region: ['省', '市', '区'],
        orderId: '',
        pinkId: '',
        couponId: '',
        id: 0,
        userAddress: {}
    },
    onLoad: function(options) {
        if (options.type == 'edit') {
            let regionOne = "region.0";
            let regionTwo = "region.1";
            let regionTherr = "region.2";
            let data = wx.getStorageSync('editAddress');
            //从缓存中取编辑地址
            this.setData({
                userAddress: data,
                [regionOne]: data.province,
                [regionTwo]: data.city,
                [regionTherr]: data.district,
            })
        }
        if (options.orderId) {
            this.setData({
                orderId: options.orderId
            })
        }
    },

    bindRegionChange: function(e) {
        this.setData({
            region: e.detail.value
        })
    },

    defaulttap: function(e) {
        console.log('设为默认地址')
    },

    formSubmit(e) {
        let warn = "";
        let flag = true;
        let name = e.detail.value.name;
        let phone = e.detail.value.phone;
        let area = JSON.stringify(this.data.region);
        let fulladdress = e.detail.value.fulladdress;
        let addressP = {};
        if (name == "") {
            warn = '请输入姓名';
        } else if (!/^1(3|4|5|7|8|9)\d{9}$/i.test(phone)) {
            warn = '您输入的手机号有误'
        } else if (area == '["省","市","区"]') {
            warn = '请选择地区';
        } else if (fulladdress == "") {
            warn = "请填写具体地址";
        } else {
            flag = false;
        }
        if (flag == true) {
            wx.showModal({
                title: '提示',
                content: warn
            })
        } else {
            let data = {
                real_name: name,
                phone: phone,
                province: this.data.region[0],
                city: this.data.region[1],
                district: this.data.region[2],
                detail: fulladdress,
                post_code: ''
            }
            if (this.options.type == 'edit') {
                data.list_id = this.data.userAddress.list_id;
                userModel.editAddress(data)
                    .then(res => {
                        if (res.code) {
                            wx.showToast({
                                title: '修改成功',
                                icon: 'success',
                                duration: 1000
                            })
                            setTimeout(function() {
                                wx.navigateBack()
                            }, 1000)

                        } else {
                            wx.showToast({
                                title: '添加失败',
                                icon: 'none'
                            })
                        }

                    })
            } else {
                userModel.saveAddressList(data)
                    .then(res => {
                        if (res.code) {
                            wx.showToast({
                                title: '添加成功',
                            });
                            setTimeout(() => {
                                if (this.data.orderId) {
                                    data.list_id = res.list_id;
                                    let selectAddress = data;
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
                                } else {
                                    wx.navigateBack();
                                }

                            }, 1000)
                        } else {
                            wx.showToast({
                                title: '添加失败',
                                icon: 'none'
                            })
                        }
                    })
            }

        }
    }


})