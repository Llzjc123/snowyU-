import {
    HTTP
} from "../utils/http-p";
import api from "../utils/api.js";
class CartModel extends HTTP {

    getCartList(data = {}) {
        return this.request({
            url: api.cart.cart_list,
            data: data,
            method: 'POST'
        });
    }

    getCartNum(data = {}) {
        return this.request({
            url: api.cart.cart_num,
            data: data,
            method: 'POST'
        });
    }

    addCart(data = {}) {
        return this.request({
            url: api.cart.add_cart,
            data: data,
            method: 'POST'
        });
    }

    delCart(data = {}) {
        return this.request({
            url: api.cart.del_cart,
            data: data,
            method: 'POST'
        });
    }

    editCart(data = {}) {
        return this.request({
            url: api.cart.edit_cart,
            data: data,
            method: 'POST'
        });
    }

    addCollect(data = {}) {
        return this.request({
            url: api.cart.add_collect,
            data: data,
            method: 'POST'
        });
    }

    delCollect(data = {}) {
        return this.request({
            url: api.cart.del_collect,
            data: data,
            method: 'POST'
        });
    }

    getCollectList(data = {}) {
        return this.request({
            url: api.cart.collect,
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
}
export {
    CartModel
}