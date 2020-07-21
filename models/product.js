import {
    HTTP
} from "../utils/http-p";
import api from "../utils/api.js";
class ProductModel extends HTTP {
    getProductList(data = {}) {
        return this.request({
            url: api.index.goods_list,
            data: data,
            method: 'POST'
        });
    }

    getProductTimeList(data = {}) {
        return this.request({
            url: api.product.product_time_list,
            data: data,
            method: 'POST'
        });
    }

    getProductTuanList(data = {}) {
        return this.request({
            url: api.product.product_combination_list,
            data: data,
            method: 'POST'
        });
    }

    getProductDetail(data = {}) {
        return this.request({
            url: api.product.pro_detail,
            data: data,
            method: 'POST'
        });
    }


    getTimeProductDetail(data = {}) {
        return this.request({
            url: api.product.pro_seckill_detail,
            data: data,
            method: 'POST'
        });
    }

    getCombinationProductDetail(data = {}) {
        return this.request({
            url: api.product.product_combination_detail,
            data: data,
            method: 'POST'
        });
    }

    getCombinationProductAdd(data = {}) {
        return this.request({
            url: api.product.product_combination_add,
            data: data,
            method: 'POST'
        });
    }

    getCombinationInfo(data = {}) {
        return this.request({
            url: api.product.product_combination_info,
            data: data,
            method: 'POST'
        });
    }

    getProductAttr(data = {}) {
        return this.request({
            url: api.product.pro_attr,
            data: data,
            method: 'POST'
        });
    }

    getCartOrderList(data = {}) {
        return this.request({
            url: api.product.cart_order_list,
            data: data,
            method: 'POST'
        });
    }

    orderAdd(data = {}) {
        return this.request({
            url: api.product.add_order,
            data: data,
            method: 'POST'
        });
    }


    nowBuy(data = {}) {
        return this.request({
            url: api.product.now_buy,
            data: data,
            method: 'POST'
        });
    }

    productTimeNowBuy(data = {}) {
        return this.request({
            url: api.product.product_time_buy,
            data: data,
            method: 'POST'
        });
    }

    getOrderList(data = {}) {
        return this.request({
            url: api.product.order_list,
            data: data,
            method: 'POST'
        });
    }

    getOrderDetail(data = {}) {
        return this.request({
            url: api.product.order_detail,
            data: data,
            method: 'POST'
        });
    }

    orderDel(data = {}) {
        return this.request({
            url: api.product.order_del,
            data: data,
            method: 'POST'
        });
    }

    orderPay(data = {}) {
        return this.request({
            url: api.product.pay_order,
            data: data,
            method: 'POST'
        });
    }

    orderPayRefund(data = {}) {
        return this.request({
            url: api.product.pay_refund,
            data: data,
            method: 'POST'
        });
    }

    orderTuanPay(data = {}) {
        return this.request({
            url: api.product.pay_tuan_order,
            data: data,
            method: 'POST'
        });
    }

    orderMiaoPay(data = {}) {
        return this.request({
            url: api.product.pay_miao_order,
            data: data,
            method: 'POST'
        });
    }

    orderConfirm(data = {}) {
        return this.request({
            url: api.product.confirm_order,
            data: data,
            method: 'POST'
        });
    }

    orderComment(data = {}) {
        return this.request({
            url: api.product.comment_order,
            data: data,
            method: 'POST'
        });
    }

    getCommentList(data = {}) {
        return this.request({
            url: api.product.comment_list,
            data: data,
            method: 'POST'
        });
    }

    getUserIntegral(data = {}) {
        return this.request({
            url: api.product.user_getuserintegral,
            data: data,
            method: 'POST'
        });
    }

    getProductWuliu(data = {}) {
        return this.request({
            url: api.product.store_wuliu,
            data: data,
            method: 'POST'
        });
    }


    getWuliuCompany(data = {}) {
        return this.request({
            url: api.product.store_wuliu_company,
            data: data,
            method: 'POST'
        });
    }
}

export {
    ProductModel
}