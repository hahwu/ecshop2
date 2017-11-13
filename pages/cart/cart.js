// pages/cart/cart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showFoot:true,
    showTop:false,
    text:'编辑',
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: 'https://www.yuncms.online/tomato/wx_cart.php',
      data:{
        mode:'list',
        user_id:wx.getStorageSync('user_id'),
      },
      success:function(res){
        console.log(res.data)
        that.setData({
          carts:res.data
        })
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
  edit:function(res){
    this.test()
    if(this.data.text == '编辑'){
      this.setData({
        showTop: true,
        showFoot: false,
        text: '完成'
      })
    }else{
      this.setData({
        showTop: false,
        showFoot: true,
        text: '编辑'
      })
    }
  }
})