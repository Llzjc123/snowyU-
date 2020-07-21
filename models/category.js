import {
    HTTP
} from "../utils/http-p";
import api from "../utils/api.js";
class CategoryModel extends HTTP {

    getProductCategoryData(data = {}) {
        return this.request({
            url: api.category.producy_category,
            data: data,
            method: 'POST'
        });
    }

    getStoreList(data = {}) {
        return this.request({
            url: api.category.store_list,
            data: data,
            method: 'POST'
        });
    }

    getStoreInfo(data = {}) {
        return this.request({
            url: api.category.store_info,
            data: data,
            method: 'POST'
        });
    }
}
export {
    CategoryModel
}