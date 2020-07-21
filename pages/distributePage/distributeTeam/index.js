import {
    UserModel
} from '../../../models/user';
const userModel = new UserModel();
const app = getApp();
Page({
    data: {
        scrollPxHeight: wx.getSystemInfoSync().windowHeight,
        level: 1,
        teamList: [],
        level_one_num: 0,
        level_two_num: 0,
    },
    onLoad: function(options) {
        this.getTeamList();
    },
    getTeamList() {
        let data = {
            level: this.data.level
        }
        userModel.getTeamList(data)
            .then(res => {
                this.setData({
                    teamList: res.data.resultlist,
                    level_one_num: res.data.level_one_num,
                    level_two_num: res.data.level_two_num,
                })
            })
    },
    onReady: function() {
        let height = wx.getSystemInfoSync().windowHeight;
        let width = wx.getSystemInfoSync().windowWidth;
        let searchHeight = 94 / (750 / width);
        let scrollPxHeight = height - searchHeight;
        this.setData({
            scrollPxHeight
        })
    },
    selectLevel1() {
        this.setData({
            level: 1,
            teamList:[]
        });
        this.getTeamList();
    },
    selectLevel2() {
        this.setData({
            level: 2,
            teamList:[]
        });
        this.getTeamList();
    }
})