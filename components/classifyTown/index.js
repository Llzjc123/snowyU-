Component({
    /**
     * 组件的属性列表
     */
    properties: {
        data: Array,
        category: Array,
        activeId: String,
    },

    /**
     * 组件的初始数据
     */
    data: {
        scrollPxHeight: wx.getSystemInfoSync().windowHeight,
        activeItem: 0,
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
    methods: {
        selectTownFunc(e) {
            let id = e.currentTarget.dataset.index;
            this.setData({
                activeId: id
            });
            this.triggerEvent('townNavOneTap', {
                id
            }, {});
        }
    }
})