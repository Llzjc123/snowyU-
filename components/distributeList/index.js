Component({
    /**
     * 组件的属性列表
     */
    properties: {
        data: Object,
        type: String
    },

    /**
     * 组件的初始数据
     */
    data: {
        scrollPxHeight: wx.getSystemInfoSync().windowHeight,
        status: 1
    },
    ready: function() {
        let height = wx.getSystemInfoSync().windowHeight
        let width = wx.getSystemInfoSync().windowWidth
        let searchHeight = 80 / (750 / width)
        let scrollPxHeight = height - searchHeight;
        this.setData({
            scrollPxHeight
        })
    },
    /**
     * 组件的方法列表
     */
    methods: {}
})