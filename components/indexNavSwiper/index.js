Component({

    properties: {
        navOneList: Array
    },

    data: {
        interval: 10000,
        duration: 500,
        data: []
    },

    methods: {
        toLink(e) {
            let name = e.currentTarget.dataset.item.name;
            let url = e.currentTarget.dataset.item.url;
            let reg = url.indexOf('pid');
            url = reg == -1 ? url : url + '&name=' + name;
            if (name == '所有产品') {
                wx.switchTab({
                    url: '/pages/classify/classify',
                })
            } else {
                wx.navigateTo({
                    url: url,
                });
            }
        }
    }
})