Component({

    properties: {
        data: Array,
        hightId: String, //高亮的分类ID

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
        changeData: function(res) {
            let id = res.currentTarget.dataset.id;
            this.setData({
                hightId: id
            });
            this.triggerEvent('navTwoTap', {
                id
            }, {});
        }

    }
})