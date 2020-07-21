Component({

    properties: {
        categoryList: Array,
        hightId: String, //高亮的分类ID  推荐为0
        scrollLeft: Number,

    },

    data: {
        categoryList: [{}, {}, {}],
        showIndex: 0, //当前展示的分类数据的索引
        toView: 'list-0',
    },

    attached() {
        this.setData({ toView: 'list-' + this.properties.hightId });
    },

    methods: {
        changeData: function (res) {
            let data = res.target.dataset.item;
            let id = data.id;
            let showIndex = res.target.dataset.index;
            this.setData({
                showIndex
            });
            this.triggerEvent('naviTap', {
                id
            }, {});
        }

    }
})