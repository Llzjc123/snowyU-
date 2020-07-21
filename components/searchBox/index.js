// components/index/searchBox/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        hasFire: Boolean, //是否有火图标
        hasIcon: Boolean, //是否有左右图标
    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {
        goSearch() {
            wx.navigateTo({
                url: '/pages/searchPage/index',
            });
        },
    }
})