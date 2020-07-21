Component({
    properties: {
        type: String, //默认团购 new抢购 time限时秒杀
        data: Object,
    },

    data: {

    },

    methods: {
        toDetail() {
            //console.log(this.properties.type)
            let data = this.properties;
            let type = !this.properties.type ? 3 : this.properties.type == 'time' ? 4 : '';
            //console.log(type)
            wx.navigateTo({
                url: '/pages/productDetail/index?productId=' + this.properties.data.list_id + '&type=' + type,
            })
        }
    }
})