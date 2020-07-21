import {
    ProductModel
} from '../../models/product';
const productModel = new ProductModel();
import {
    IndexModel
} from '../../models/index';
const indexModel = new IndexModel();
const limit = 10;
const app = getApp();
Page({
    data: {
        loading: false,
        productList: [],
        title: '拼团',
        activityTitle: '大家都在拼',
        bannerImg: ''
    },
    onLoad: function(options) {

        indexModel.getListBannerData()
            .then(res => {
                res.map((val) => {
                    if (val.id == 1) {
                        this.setData({
                            bannerImg: val.src
                        })
                    }
                })
            })
    },
    onShow() {
        this.getData();
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
    getData() {
        let data = {
            cate_id: this.data.cateId,
            limit: limit
        }
        //团购商品初始化
        productModel.getProductTuanList()
            .then(res => {
                this.setData({
                    productList: res.code ? res.data.resultlist : [],
                    endFlag: res.data.pagelist.page < res.data.pagelist.pages ? 1 : 0,
                    loading: true
                });
            })
    }
})