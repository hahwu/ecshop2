// pages/cart/cart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showFoot:true,
    showTop:false,
    text:'编辑',
    total_price:0,
    total_num:0,
    margin:120,
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
        that.setData({
          carts:res.data
        })
        that.refresh()
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
    if(this.data.text == '编辑'){
      this.setData({
        showTop: true,
        showFoot: false,
        text: '完成',
        margin:220
      })
    }else{
      this.setData({
        showTop: false,
        showFoot: true,
        text: '编辑',
        margin:120,
      })
    }
  },
  subtraction:function(res){
    var index = res.target.dataset.num
    var goods_num = parseInt(this.data.carts[index]['goods_number']) - 1
    if(goods_num < 1) return false
    var that = this
    wx.request({
      url: 'https://www.yuncms.online/tomato/wx_cart.php',
      data:{
        mode:'subtraction',
        rec_id:res.currentTarget.id,
        goods_number:goods_num
      },
      success:function(res){
        var carts = that.data.carts
        carts[index]['goods_number'] = goods_num
        that.refresh()
        that.setData({
          carts:carts
        })
      }
    })
  },
  add:function(res){
    var index = res.target.dataset.num
    var goods_num = parseInt(this.data.carts[index]['goods_number']) + 1
    if (goods_num >99) return false
    var that = this
    wx.request({
      url: 'https://www.yuncms.online/tomato/wx_cart.php',
      data: {
        mode: 'add',
        rec_id: res.currentTarget.id,
        goods_number:goods_num
      },
      success: function (res) {
        var carts = that.data.carts
        carts[index]['goods_number'] = parseInt(goods_num)
        that.refresh()
        that.setData({
          carts: carts
        })
      }
    })
  },
  refresh:function(res){
    var total_price = 0
    var total_num = 0
    var cart = this.data.carts
    console.log(cart)
    for (var i = 0; i < cart.length;i++){
      total_price+= parseFloat(cart[i]['goods_price'])*parseInt(cart[i]['goods_number'])
      total_num+=parseInt(cart[0]['goods_number'])
      console.log(total_price)
    }
    this.setData({
      total_price:total_price,
      total_num:total_num
    })
  }
})