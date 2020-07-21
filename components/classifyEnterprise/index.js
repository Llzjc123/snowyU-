// components/classifyEnterprise/index.js
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
    activeItem: 0,
    dataArr: [
      {
        store_img: '../images/enterprise-img.png',
        store_name: '企业电商服务',
        store_info: '创立于2001年5月，专注于五谷杂粮',
        product_img: '../images/enterprise-product1.png'
      },
      {
        store_img: '../images/enterprise-img.png',
        store_name: '企业电商服务',
        store_info: '创立于2001年5月，专注于五谷杂粮',
        product_img: '../images/enterprise-product1.png'
      },
      {
        store_img: '../images/enterprise-img.png',
        store_name: '企业电商服务',
        store_info: '创立于2001年5月，专注于五谷杂粮',
        product_img: '../images/enterprise-product1.png'
      },
      {
        store_img: '../images/enterprise-img.png',
        store_name: '企业电商服务',
        store_info: '创立于2001年5月，专注于五谷杂粮',
        product_img: '../images/enterprise-product1.png'
      },
      {
        store_img: '../images/enterprise-img.png',
        store_name: '企业电商服务',
        store_info: '创立于2001年5月，专注于五谷杂粮',
        product_img: '../images/enterprise-product1.png'
      },
      {
        store_img: '../images/enterprise-img.png',
        store_name: '企业电商服务',
        store_info: '创立于2001年5月，专注于五谷杂粮',
        product_img: '../images/enterprise-product1.png'
      },
      {
        store_img: '../images/enterprise-img.png',
        store_name: '企业电商服务',
        store_info: '创立于2001年5月，专注于五谷杂粮',
        product_img: '../images/enterprise-product1.png'
      },
      {
        store_img: '../images/enterprise-img.png',
        store_name: '企业电商服务',
        store_info: '创立于2001年5月，专注于五谷杂粮',
        product_img: '../images/enterprise-product1.png'
      }
    ]
  },
  ready: function () {
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
  }
})