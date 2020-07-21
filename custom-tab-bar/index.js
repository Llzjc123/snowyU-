Component({
  data: {
    selected: 0,
    color: "#7A7E83",
    selectedColor: "#3cc51f",
    list: [{
        pagePath: "/pages/index/index",
        iconPath: "/images/tab/home.png",
        selectedIconPath: "/images/tab/home@high.png",
        text: "首页"
    }, {
        pagePath: "/pages/classify/classify",
        iconPath: "/images/tab/classify.png",
        selectedIconPath: "/images/tab/classify@high.png",
        text: "分类"
      }, {
        pagePath: "/pages/car/car",
        iconPath: "/images/tab/cart.png",
        selectedIconPath: "/images/tab/cart@high.png",
        text: "购物车"
      }, {
        pagePath: "/pages/my/my",
        iconPath: "/images/tab/user.png",
        selectedIconPath: "/images/tab/user@high.png",
        text: "我的"
      }]
  },
  attached() {
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({url})
      this.setData({
        selected: data.index
      })
    }
  }
})