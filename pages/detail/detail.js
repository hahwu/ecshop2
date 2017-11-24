// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num:1,
    word:'',
    bindtap:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({goods_id:options.goods_id})
    var goods_id = options.goods_id
    var that = this
    wx.request({
      url: 'https://www.yuncms.online/tomato/wx_detail.php',
      data:{goods_id:goods_id},
      success:function(res){
        console.log(res.data)
        that.setData({
          goods:res.data
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
  showModal: function (res) {
    // 显示遮罩层
    if(res.currentTarget.dataset.id == 'cart'){
      this.setData({
        word:'购物车',
        bindtap:'add_cart',
      })
    }else{
      this.setData({
        word:'下一步',
        bindtap:'next',
      })
    }
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
      showModalStatus: true
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 200)
    var goods = this.data.goods
    var attr_id = goods['attr'][0]['id']
    var attr = goods['attr']
    this.setData({
      cart: goods,
      select_attr: attr_id,
      attr: attr
    })
    wx.setStorageSync('cart_good', this.data.goods[res.currentTarget.id])
  },
  hideModal: function () {
    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
      select_attr: 0,
      num: 1
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false
      })
    }.bind(this), 200)
  },
  clickAttr: function (res) {
    console.log(res)
    var attr = []
    attr['id'] = res.currentTarget.id
    attr['text'] = res.currentTarget.dataset.text
    console.log(attr)
    wx.setStorageSync('attr_id', attr['id'])
    wx.setStorageSync('attr_text', attr['text'])
    this.setData({ select_attr: attr['id'], s_attr: attr })
  },
  subtraction: function (res) {
    if (this.data.num > 1) {
      var newnum = this.data.num - 1
      this.setData({
        num: newnum
      })
    }
  },
  add: function (res) {
    if (this.data.num < 99) {
      var newnum = this.data.num + 1
      this.setData({
        num: newnum
      })
    }
  },
  add_cart: function (res) {
    var that = this
    var goods = this.data.cart
    var attr = wx.getStorageSync('attr')
    var num = this.data.num
    wx.request({
      url: 'https://www.yuncms.online/tomato/wx_cart.php',
      data: {
        mode: 'insert',
        goods_number: num,
        goods_name: goods['goods_name'],
        goods_id: goods['goods_id'],
        user_id: wx.getStorageSync('user_id'),
        goods_price: goods['shop_price'],
        goods_attr: wx.getStorageSync('attr_text'),
        goods_attr_id: wx.getStorageSync('attr_id'),
      },
      success: function (res) {
        console.log(res.data)
        that.hideModal()
        wx.switchTab({
          url: '../cart/cart',
          success: function (e) {
          }
        })
      }
    })
  },
  next:function(res){
    var goods = this.data.cart
    var attr = wx.getStorageSync('attr')
    var num = this.data.num
    var user_id = wx.getStorageSync('user_id')
    var goods_attr = wx.getStorageSync('attr_text')
    var goods_attr_id = wx.getStorageSync('attr_id')
    wx.navigateTo({
      url: '../buy/buy?goods_number=' + this.data.num + '&goods_id=' + goods['goods_id'] + '&user_id=' + user_id + '&goods_attr=' + goods_attr+'&goods_attr_id='+goods_attr_id,
      data:{
        mode: 'insert',
        goods_number: this.data.num,
        goods_name: goods['goods_name'],
        goods_id: goods['goods_id'],
        user_id: wx.getStorageSync('user_id'),
        goods_price: goods['shop_price'],
        
      },
    })
  }
})