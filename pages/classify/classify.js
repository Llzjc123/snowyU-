import {
    CategoryModel
} from '../../models/category';
const categoryModel = new CategoryModel();
import {
    IndexModel
} from '../../models/index';
const indexModel = new IndexModel();
const app = getApp();
const limit = 10;
const listType = 1; //所有产品
const allId = 57;
const ownId = 58;
Page({
    data: {
        navList: ['所有商品', '商城自营', '镇村站点', '企业店铺', '个人店铺'],
        productCategory: [],
        goodsList: [],
        arr: [],
        storeCategory: [],
        storeList: [],
        townActiveId: 0,
        activeItem: 0,
        activeId: 0,
        loading: true,
    },
    onLoad: function() {
        this.productCategory();
    },
    productCategory() {
        let data = {
            list_id: allId
        }
        let data2 = {
            roles: 3
        }
        switch (this.data.activeItem) {
            case 0:
                data.list_id = allId;
                this.productList(data)
                break;
            case 1:
                data.list_id = ownId;
                data.mer_id = 0;
                this.productList(data)
                break;
            case 2:
                data2.roles = 4;
                this.getStoreList(data2)
                break;
            case 3:
                data2.roles = 3;
                this.getStoreList(data2)
                break;
            case 4:
                data2.roles = 5;
                this.getStoreList(data2)
                break;
        }


    },
    productList(data) {
        categoryModel.getProductCategoryData(data)
            .then(res => {
                this.setData({
                    productCategory: res.data,
                    activeId: res.data[0].list_id,
                    // loading: false,
                    // goodsList: res.plist
                })
                let params = {
                    list_id: data.list_id,
                    cate_id: res.data[0].list_id
                }
                data.mer_id == 0 ? params.mer_id = 0 : ''
                return categoryModel.getProductCategoryData(params)

            }).then(res => {
                this.setData({
                    loading: false,
                    goodsList: res.plist
                })
            })
    },
    getStoreList(data) {
        categoryModel.getStoreList(data)
            .then(res => {
                this.setData({
                    storeCategory: res.data ? res.data : [],
                })
                if (data.roles == 4) {
                    let params = {
                        roles: 4,
                        pid: this.data.storeCategory[0].id
                    }
                    categoryModel.getStoreList(params)
                        .then(res => {
                            this.setData({
                                townActiveId: params.pid,
                                storeList: res.store,
                                loading: false,
                            })
                        })
                } else {
                    this.setData({
                        storeList: res.store,
                        loading: false,
                    })
                }

            })

    },

    onNavChange(e) {
        let index = e.currentTarget.dataset.index;
        this.setData({
            activeItem: index,
            loading: true,
        })
        this.productCategory();
    },

    changeNavOneTap(e) {
        let data = {
            cate_id: e.detail.id,
            list_id: allId
        }
        switch (this.data.activeItem) {
            case 0:
                data.list_id = allId;
                break;
            case 1:
                data.list_id = ownId;
                data.mer_id = 0;
                break;
        }
        this.setData({
            activeId: e.detail.id
        });
        categoryModel.getProductCategoryData(data)
            .then(res => {
                this.setData({
                    goodsList: res.plist
                });
            });
    },

    townNavOneTap(e) {
        let data = {
            pid: e.detail.id,
            roles: 4
        }
        this.setData({
            townActiveId: e.detail.id
        });
        categoryModel.getStoreList(data)
            .then(res => {
                this.setData({
                    storeList: res.store,
                })
            })
    },
    onPullDownRefresh: function() {
        // 显示顶部刷新图标
        wx.showNavigationBarLoading();
        var that = this;
        this.setData({
            productCategory: [],
            goodsList: [],
            arr: [],
            storeCategory: [],
            storeList: [],
        })
        this.productCategory();
        setTimeout(() => {
            wx.hideNavigationBarLoading();
            wx.stopPullDownRefresh();
        }, 500)
    },
})