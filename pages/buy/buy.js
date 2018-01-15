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
    wx.request({
      url: 'https://www.duonimytus.cn/wx_user.php',
      data: {
        mode: 'address_list',
        user_id: wx.getStorageSync('user_id')
      },
      success: function (res) {
        console.log(res.data)
        that.setData({ address: res.data[0] })
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