Component({
    properties: {
        data: Array,
        activeId: String,
        goodsList:Array
    },

    
    data: {
        scrollPxHeight: wx.getSystemInfoSync().windowHeight
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

    methods: {
        selectProductFunc(e) {
            let id = e.currentTarget.dataset.id;
            this.setData({
                activeId: id
            });
            this.triggerEvent('navOneTap', {
                id
            }, {});
        }
    }
})