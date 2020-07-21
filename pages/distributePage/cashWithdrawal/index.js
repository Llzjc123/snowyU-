const app = getApp();
import {
    UserModel
} from '../../../models/user';
const userModel = new UserModel();
Page({
    data: {
        money: ''
    },
    onLoad: function(options) {
        userModel.getMyStoreData()
            .then(res => {
                this.setData({
                    now_money: res.data.ktx
                })
            })
    },

    formSubmit(e) {
        let value = e.detail.value;
        if (!value.money) {
            wx.showToast({
                title: '请输入提现金额',
                icon: 'none'
            });
            return;
        }

        if (!value.username) {
            wx.showToast({
                title: '请输入您的真实姓名',
                icon: 'none'
            });
            return;
        }
        if (value.money > this.data.now_money) {
            wx.showToast({
                title: '当前提现金额大于可提现金额',
                icon: 'none'
            });
            return;
        }

        let data = {
            money: value.money,
            extract_type: 'weixin',
            real_name: value.username
        }
        userModel.submitCashOut(data)
            .then(res => {
                if (res.code == 1) {
                    wx.showToast({
                        title: res.info,
                    });
                    setTimeout(() => {
                        wx.navigateTo({
                            url: '/pages/distributePage/discountRecord/index',
                        })
                    }, 500)

                } else {
                    wx.showToast({
                        title: res.info,
                        icon: 'none'
                    })
                }
            })

    },
    allInput() {
        this.setData({
            money: this.data.now_money
        })
    },
})