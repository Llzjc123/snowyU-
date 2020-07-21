import { api_base_url,err_code_tips } from '../config';
class HTTP {
    request({url, data = {}, method = 'GET' }) {
        data.uid = wx.getStorageSync('openid');
        return new Promise((resolve, reject) => {
            this._request(url, resolve, reject, data, method);
        })
    }

    _request(url, resolve, reject, data = {}, method = 'GET') {
        wx.request({
            url: api_base_url + url,
            method: method,
            data: data,
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            success: (res) => {
                let code = res.statusCode.toString();
                if (code.startsWith('2')) {
                    resolve(res.data);
                } else {
                    reject();
                    //this._show_error(res.data.error_code);
                }
            },
            fail: (err) => {
                //this._show_error(1);
                reject();
            }
        })
    };
    _show_error(err_code) {
        //内部私有方法，外部不调用
        if (!err_code || !err_code_tips[err_code]) err_code = 1;
        wx.showToast({
            title: err_code_tips[err_code],
            icon: 'none',
            duration: 2000
        });

    }
}
export {
    HTTP
}