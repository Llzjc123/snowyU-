const app = getApp();
import {
    ProductModel
} from '../../models/product';
const productModel = new ProductModel();
Page({

    data: {
        wuliuList: null
    },

    onLoad: function(options) {
        let data = {
            list_id: options.orderId
        }
        productModel.getProductWuliu(data)
            .then(res => {
                if(res.code){
                    this.setData({
                        wuliuList: res.data
                    })
                }
                
            })
    },

    onShow: function() {

    },

})