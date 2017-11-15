// pages/address/address.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    blank:"   "
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: 'https://www.yuncms.online/tomato/wx_user.php',
      data:{
        mode:'address_list',
        user_id:wx.getStorageSync('user_id')
        },
      success:function(res){
        console.log(res.data)
        that.setData({address:res.data})
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  chooseAdd:function(res){
    var that = this
    wx.chooseAddress({
      success: function(res) {
        console.log(res) 
        wx.request({
          url: 'https://www.yuncms.online/tomato/wx_user.php',
          data:{
            mode:'addAddress',
            address:res,
            user_id:wx.getStorageSync('user_id')
          },
          success:function(res){
            console.log(res.data)
          }
        })
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  }
})