// pages/buy/buy.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    this.setData({goods:wx.getStorageSync('buy')})
    wx.request({
      url: 'https://www.duonimytus.cn/wx_order.php',
      data: {
        mode: 'make_order',
        user_id: wx.getStorageSync('user_id'),
        goods:that.data.goods,
        },
      success: function (res) {
        console.log(res.data)
        that.setData({orderNo:res.data.orderNo})
      }
    })
    console.log(options)
  },
  /*
  **选择新地址
  */
  chooseAdd: function (res) {
    var that = this
    wx.chooseAddress({
      success: function (res) {
        console.log(res)
        
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  
})