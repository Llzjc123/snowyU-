const app = getApp();
import {
    UserModel
} from '../../../models/user';
const userModel = new UserModel();
Page({
    data: {
        status: 1,
        moneyList: []
    },
    onLoad: function(options) {
        userModel.getOrderExtractList()
            .then(res => {
                this.setData({
                    moneyList: res.data.resultlist
                })
            })
    }
})