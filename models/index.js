import {
    HTTP
} from "../utils/http-p";
import api from "../utils/api.js";
class IndexModel extends HTTP {

    getBannerData(data = {}) {
        return this.request({
            url: api.index.banner,
            data: data,
            method: 'POST'
        });
    }

    

    getListBannerData(data = {}) {
        return this.request({
            url: api.index.index_banner,
            data: data,
            method: 'POST'
        });
    }

    getIndexData(data = {}) {
        return this.request({
            url: api.index.nav_one,
            data: data,
            method: 'POST'
        });
    }

    getSearchData(data = {}) {
        return this.request({
            url: api.index.search_list,
            data: data,
            method: 'POST'
        });
    }

    getNavHotList(data = {}) {
        return this.request({
            url: api.index.nav_hot,
            data: data,
            method: 'POST'
        });
    }

    getGoodsList(data = {}) {
        return this.request({
            url: api.index.goods_list,
            data: data,
            method: 'POST'
        });
    }

    getGXZList(data = {}) {
        return this.request({
            url: api.index.index_gxz,
            data: data,
            method: 'POST'
        });
    }

    getFptp(data = {}) {
        return this.request({
            url: api.index.index_fptp,
            data: data,
            method: 'POST'
        });
    }
    getNewsList(data = {}) {
        return this.request({
            url: api.news.news_list,
            data: data,
            method: 'POST'
        });
    }

    //获取惠民信息
    getNewsMessageList(data = {}) {
        return this.request({
            url: api.news.news_message,
            data: data,
            method: 'POST'
        });
    }

    getCouponList(data = {}) {
        return this.request({
            url: api.coupon.get_coupon_list,
            data: data,
            method: 'POST'
        });
    }

    getCoupon(data = {}) {
        return this.request({
            url: api.coupon.get_coupon,
            data: data,
            method: 'POST'
        });
    }


    getThkS(data = {}) {
        return this.request({
            url: api.index.index_thk_s,
            data: data,
            method: 'POST'
        });
    }

    getThkDh(data = {}) {
        return this.request({
            url: api.index.index_thk_dh,
            data: data,
            method: 'POST'
        });
    }

    getDhList(data = {}) {
        return this.request({
            url: api.index.index_thk_user,
            data: data,
            method: 'POST'
        });
    }


    getDhDetail(data = {}) {
        return this.request({
            url: api.index.index_thk_ny,
            data: data,
            method: 'POST'
        });
    }

}

export {
    IndexModel
}