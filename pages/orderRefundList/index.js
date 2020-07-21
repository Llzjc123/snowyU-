const app = getApp();
import {
    ProductModel
} from '../../models/product';
const productModel = new ProductModel();
const limit = 10;
Page({

    data: {
        loading: true,
        endFlag: 1, //是否有数据0是没有
        pageNo: 1,
        moreLoading: false,
        orderlist: [],
        nowstatus: 0, //0审核中1已退款
    },

    onLoad: function(options) {
        this.getorderlist();
    },

    getorderlist() {
        let data = {
            status: 5,
            page: this.data.pageNo,
            limit: limit
        }
        productModel.getOrderList(data)
            .then(res => {
                let arr = [];
                let obj = res.data.resultlist;
                let objkey = Object.keys(obj);
                for (let i in objkey) {
                    arr.push(obj[objkey[i]]);
                }
                this.setData({
                    loading: false,
                    [`orderlist[${this.data.orderlist.length}]`]: arr,
                    endFlag: res.data.pagelist.page < res.data.pagelist.pages ? 1 : 0
                })
            })

    },

    onReachBottom() {
        if (this.data.endFlag == 1 && !this.data.moreLoading) {
            this.setData({
                moreLoading: true
            });
            let data = {
                status: 5,
                page: this.data.pageNo + 1,
                limit: limit
            };
            productModel.getOrderList(data)
                .then(res => {
                    let arr = [];
                    let obj = res.data.resultlist;
                    let objkey = Object.keys(obj);
                    for (let i in objkey) {
                        arr.push(obj[objkey[i]]);
                    }
                    this.setData({
                        [`orderlist[${this.data.orderlist.length}]`]: arr,
                        endFlag: res.data.pagelist.page < res.data.pagelist.pages ? 1 : 0,
                        moreLoading: false,
                        pageNo: res.data.pagelist.page
                    })
                })
        }
    },

})