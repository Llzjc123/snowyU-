import {
    againGroup
} from '../../utils/util.js';
Component({

    properties: {
        data:Array
    },

    data: {
        interval: 10000,
        duration: 500,
        arr:[]
    },
    observers: {
        'data': function (data) {
            let arr = againGroup(this.properties.data, 3);
            this.setData({
                arr
            })
        }
    },
    lifetimes: {
        attached: function () {
            // console.log(this.properties.data)
            // let arr = againGroup(this.properties.data,3);
            // this.setData({
            //     arr
            // })
        },
    },
    methods: {

    }
})
