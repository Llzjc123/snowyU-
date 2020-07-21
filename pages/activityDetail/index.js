const app = getApp();
Page({
  data: {
    scrollPxHeight: wx.getSystemInfoSync().windowHeight,
    arr: [1, 2, 3, 4],
    title: '拼团',
    activityTitle: '大家都在拼'
  },
  onLoad: function (options) {
    let type = parseInt(options.type)
    let title = '拼团'
    console.log(parseInt(type))
    switch (type) {
      case 1:
          title = '拼团'
          this.setData({
            activityTitle: '大家都在拼'
          })
        break;
      case 2:
          title = '秒杀'
          this.setData({
            activityTitle: '秒杀中'
          })
        break;
      default:
          title = '其它'
          this.setData({
            activityTitle: '其它'
          })
    }
    wx.setNavigationBarTitle({
      title: title
    })
  },
  onReady: function () {
    let height = wx.getSystemInfoSync().windowHeight;
    let width = wx.getSystemInfoSync().windowWidth;
    let searchHeight = 300 / (750 / width);
    let scrollPxHeight = height - searchHeight;
    this.setData({
      scrollPxHeight
    })
  }
})