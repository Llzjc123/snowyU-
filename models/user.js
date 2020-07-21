import {
    HTTP
} from "../utils/http-p";
import api from "../utils/api.js";
class UserModel extends HTTP {

    getUserCenter(data = {}) {
        return this.request({
            url: api.user.user_center,
            data: data,
            method: 'POST'
        });
    }

    getIsShowShop(data = {}) {
        return this.request({
            url: api.index.is_show_shop,
            data: data,
            method: 'POST'
        });
    }

    userLogin(data = {}) {
        return this.request({
            url: api.login,
            data: data,
            method: 'POST'
        });
    }

    getAddressList(data = {}) {
        return this.request({
            url: api.user.address_list,
            data: data,
            method: 'POST'
        });
    }

    //新增地址
    saveAddressList(data = {}) {
        return this.request({
            url: api.user.add_address,
            data: data,
            method: 'POST'
        });
    }

    //编辑地址
    editAddress(data = {}) {
        return this.request({
            url: api.user.edit_address,
            data: data,
            method: 'POST'
        });
    }
    //设置默认地址删除地址
    setDefault(data = {}) {
        return this.request({
            url: api.user.set_moren,
            data: data,
            method: 'POST'
        });
    }

    getDefault(data = {}) {
        return this.request({
            url: api.user.get_moren,
            data: data,
            method: 'POST'
        });
    }

    getUnitSign(data = {}) {
        return this.request({
            url: api.user.unit_sign,
            data: data,
            method: 'POST'
        });
    }

    updateUserInfo(data = {}) {
        return this.request({
            url: api.user.update_userInfo,
            data: data,
            method: 'POST'
        });
    }

    userApply(data = {}) {
        return this.request({
            url: api.user.user_apply,
            data: data,
            method: 'POST'
        });
    }

    getOrderProfitList(data = {}) {
        return this.request({
            url: api.user.order_profit_list,
            data: data,
            method: 'POST'
        });
    }

    getOrderMoneyList(data = {}) {
        return this.request({
            url: api.user.order_money_list,
            data: data,
            method: 'POST'
        });
    }


    getOrderExtractList(data = {}) {
        return this.request({
            url: api.user.order_extract_list,
            data: data,
            method: 'POST'
        });
    }

    storeCenterLogin(data = {}) {
        return this.request({
            url: api.user.store_center_login,
            data: data,
            method: 'POST'
        });
    }

    getUserStoreList(data = {}) {
        return this.request({
            url: api.user.user_store_list,
            data: data,
            method: 'POST'
        });
    }

    getMyStoreData(data = {}) {
        return this.request({
            url: api.user.my_store,
            data: data,
            method: 'POST'
        });
    }

    getQRCode(data = {}) {
        return this.request({
            url: api.index.qR_code,
            data: data,
            method: 'POST'
        });
    }


    getTeamList(data = {}) {
        return this.request({
            url: api.user.user_team_list,
            data: data,
            method: 'POST'
        });
    }

    submitCashOut(data = {}) {
        return this.request({
            url: api.user.cash_out,
            data: data,
            method: 'POST'
        });
    }

    storeOption(data = {}) {
        return this.request({
            url: api.user.store_fahuo,
            data: data,
            method: 'POST'
        });
    }

    storeTuikuan(data = {}) {
        return this.request({
            url: api.user.store_tuikuan,
            data: data,
            method: 'POST'
        });
    }

    fenxiaoInfo(data = {}) {
        return this.request({
            url: api.user.fenxiao_info,
            data: data,
            method: 'POST'
        });
    }

}

export {
    UserModel
}