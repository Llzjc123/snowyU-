Component({
    properties: {
        navOneList: Array,
        hightId: String, //高亮的分类ID  默认为0
    },

    data: {
        toView: 'list-0'
    },

    observers: {
        'hightId': function(hightId) {
            this.setData({
                toView: 'list-' + hightId
            });
        }
    },

    methods: {
        changeData(res) {
            let id = res.currentTarget.dataset.id;
            this.setData({
                hightId: id
            });
            this.triggerEvent('navOneTap', {
                id
            }, {});
        }

    }
})