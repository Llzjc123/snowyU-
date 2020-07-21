// components/hotKey/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        hotKey:Array
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
        goSearch(e) {
            wx.navigateTo({
                url: '/pages/searchPage/index?word=' + e.currentTarget.dataset.word,
            });
        },
    }
})
