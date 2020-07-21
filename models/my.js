import {
    HTTP
} from "../utils/http-p";
import api from "../utils/api.js";
class MyModel extends HTTP {


    getUnitSign(data = {}) {
        return this.request({
            url: api.my.unit_sign,
            data: data,
            method: 'POST'
        });
    }

    updateUserInfo(data = {}) {
        return this.request({
            url: api.my.update_userInfo,
            data: data,
            method: 'POST'
        });
    }

    myCouponList(data) {
        return this.request({
            url: api.user.my_coupon,
            data: data,
            method: 'POST'
        });
    }

    userFeedBack(data) {
        return this.request({
            url: api.user.user_add_leave,
            data: data,
            method: 'POST'
        });
    }
}
export {
    MyModel
}