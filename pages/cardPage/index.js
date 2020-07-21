import {
    IndexModel
} from '../../models/index';

const app = getApp();
const indexModel = new IndexModel();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        kh: '',
        product: [],
        thk: {}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        //this.getData();
    },

    inputChange(event) {
        this.setData({
            kh: event.detail.value
        });
    },
    getData() {
        wx.showLoading({
            title: '查询中',
        })
        if (!this.data.kh) {
            wx.showToast({
                title: '请输入兑换卡号',
                icon: 'none'
            })
            return;
        }
        indexModel.getThkS({
                kh: this.data.kh
            })
            .then(res => {

                wx.hideLoading();
                if (res.code == 200) {
                    this.setData({
                        product: res.product,
                        thk: res.thk
                    })
                } else {
                    wx.showToast({
                        title: res.title,
                        icon: 'none'
                    })
                    this.setData({
                        product: [],
                        thk: {}
                    })
                }

            })
    },
    formSubmit(e) {
        let warn = "";
        let flag = true;
        let contacts = e.detail.value.contacts;
        let phone = e.detail.value.phone;

        let address = e.detail.value.address;
        let addressP = {};
        if (contacts == "") {
            warn = '请输入姓名';
        } else if (!/^1(3|4|5|7|8|9)\d{9}$/i.test(phone)) {
            warn = '您输入的手机号有误'
        } else if (address == "") {
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
                id: this.data.thk.id,
                contacts: e.detail.value.contacts,
                address: e.detail.value.address,
                phone: e.detail.value.phone,
            }
            wx.showModal({
                title: '确认兑换吗？',
                content: '提货码兑换为一次性兑换，不设找零，兑换后将失效！',
                success(res) {
                    if (res.confirm) {
                        indexModel.getThkDh(data)
                            .then(res => {
                                if (res.code == 200) {
                                    wx.showToast({
                                        title: '兑换成功',
                                    });
                                    wx.navigateTo({
                                        url: '/pages/myDuiHuan/index',
                                    })  
                                } else {
                                    wx.showToast({
                                        title: '兑换失败',
                                        icon: 'none'
                                    });
                                }

                            })
                    } else if (res.cancel) {
                        console.log('用户点击取消')
                    }
                }
            })


        }
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

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