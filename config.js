import {
    md5
} from "/utils/md5.js";
import {
    formatTime,
    requestTime,
    getUUID
} from "/utils/util.js";
const img_base_url_pages = "";
const api_base_url = "https://xixiang.zhuhuane.com/api/";
const upload_img_base_url = "https://xixiang.zhuhuane.com";
// const api_base_url = "http://192.168.88.64:80/api/";
// const upload_img_base_url = "http://192.168.88.64:80";

const err_code_tips = {
    1: '出现了一个错误',
    1005: '不正确的开发者key',
    1004: '禁止访问',
    3000: '期刊不存在'
};
export {
    api_base_url,
    err_code_tips,
    img_base_url_pages,
    upload_img_base_url
}