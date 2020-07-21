import {
    HTTP
} from "../utils/http-p";
import api from "../utils/api.js";
class NewsModel extends HTTP {
    getNewsinfo(data = {}) {
        return this.request({
            url: api.news.news_info,
            data: data,
            method: 'POST'
        });
    }
    getBmxxinfo(data = {}) {
        return this.request({
            url: api.news.bmxx_info,
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

    getNewsMessageList(data = {}) {
        return this.request({
            url: api.news.news_message,
            data: data,
            method: 'POST'
        });
    }

}
export {
    NewsModel
}