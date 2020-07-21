import {
    ProductModel
} from '../../../models/product';

const productModel = new ProductModel();
import {
    UserModel
} from '../../../models/user';

const app = getApp();
const userModel = new UserModel();
Page({
    data: {
        wuliuCompany: [],
        index: -1
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        productModel.getWuliuCompany()
            .then(res => {
                this.setData({
                    wuliuCompany: res.data
                })
            })
    },

    bindPickerChange(e) {
        this.setData({
            index: e.detail.value
        })
    },

    formSubmit(e) {

        if (!e.detail.value.code) {
            wx.showToast({
                title: '请输入快递单号',
                icon: 'none'
            });
            return;
        }
        if (this.data.index < 0) {
            wx.showToast({
                title: '请选择快递公司',
                icon: 'none'
            });
            return;
        }
        let data = {
            order_id: this.options.id,
            status: 1,
            code: e.detail.value.code,
            name: this.data.wuliuCompany[this.data.index].code
        }
        userModel.storeOption(data)
            .then(res => {
                if (res.code) {
                    wx.showToast({
                        title: '操作成功',
                    })
                    setTimeout(() => {
                        wx.navigateBack();
                        // wx.navigateTo({
                        //     url: '/pages/my/orderManage/index',
                        // })
                    }, 500)
                } else {
                    wx.showToast({
                        title: res.data,
                        icon: 'none'
                    })
                }
            })
    }
})