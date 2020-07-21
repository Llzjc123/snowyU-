import {
    CategoryModel
} from '../../models/category';
const categoryModel = new CategoryModel();
const app = getApp();
Page({
    data: {
        storeId: 0,
        storeInfo: {},
        productList: [],
        loading: false,

    },
    onLoad: function(options) {
        this.storeInfo();
    },
    callphone() {
        wx.makePhoneCall({
            phoneNumber: this.data.storeInfo.store_tel //仅为示例，并非真实的电话号码
        })
    },
    onPullDownRefresh: function() {
        // 显示顶部刷新图标
        wx.showNavigationBarLoading();
        setTimeout(() => {
            wx.hideNavigationBarLoading();
            // 停止下拉动作
            wx.stopPullDownRefresh();

        }, 500)
    },
    storeInfo() {
        let data = {
            mer_id: this.options.id
        }
        categoryModel.getStoreInfo(data)
            .then(res => {
                wx.setNavigationBarTitle({
                    title: res.data.shop_name
                })
                this.setData({
                    storeInfo: res.data,
                    loading: true,
                    productList: res.data.resultlist
                })

            });
    },
    onShareAppMessage: function() {
        return {
            title: this.data.storeInfo.shop_name,

        }
    }
})