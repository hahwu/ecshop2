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
    select:true,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var select = []
    var that = this
    wx.request({
      url: 'https://www.duonimytus.cn/wx_cart.php',
      data:{
        mode:'list',
        user_id:wx.getStorageSync('user_id'),
      },
      success:function(res){
        var carts = res.data
        for(var i = 0;i<carts.length;i++){
          carts[i]['checked'] = true
        }
        that.setData({
          carts:carts
        })
        that.refresh()
      }
    })
  },
  onShow:function(options){
    var select = []
    var that = this
    wx.request({
      url: 'https://www.yuncms.online/tomato/wx_cart.php',
      data: {
        mode: 'list',
        user_id: wx.getStorageSync('user_id'),
      },
      success: function (res) {
        console.log(res.data)
        var carts = res.data
        for (var i = 0; i < carts.length; i++) {
          carts[i]['checked'] = true
        }
        that.setData({
          carts: carts
        })
        that.refresh()
      }
    })
  },
  edit:function(res){
    var carts = this.data.carts
    var select = false
    if(this.data.text == '编辑'){
      for(var i = 0;i<carts.length;i++){
        carts[i]['checked'] = false
      }
      this.setData({
        showTop: true,
        showFoot: false,
        text: '完成',
        margin:220,
        select:false,
        carts:carts
      })
    }else{
      for (var i = 0; i < carts.length; i++) {
        carts[i]['checked'] = true
      }
      this.setData({
        showTop: false,
        showFoot: true,
        text: '编辑',
        margin:120,
        select:true,
        carts:carts
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
    for (var i = 0; i < cart.length;i++){
      if(cart[i]['checked']){
        total_price += parseFloat(cart[i]['goods_price']) * parseInt(cart[i]['goods_number'])
        total_num += parseInt(cart[0]['goods_number'])
      }
    }
    this.setData({
      total_price:total_price.toFixed(2),
      total_num:total_num
    })
  },
  select:function(res){
    var id = res.currentTarget.id
    var carts = this.data.carts
    for(var i = 0;i<carts.length;i++){
      if(carts[i]['rec_id'] == id){
        if (carts[i]['checked']) {
          carts[i]['checked'] = false
        } else {
          carts[i]['checked'] = true
        }
      }
    }
    this.setData({
      carts:carts
    })
    this.refresh()
    this.refresh_select()
  },
  refresh_select:function(res){
    var carts = this.data.carts
    var select = true
    for(var i = 0;i<carts.length;i++){
      if(carts[i]['checked'] == false){
       select = false
      }
    }
    this.setData({select:select})
  },
  delete:function(res){
    var that = this
    wx.request({
      url: 'https://www.yuncms.online/tomato/wx_cart.php',
      data:{
        mode:'delete',
        carts:that.data.carts,
        user_id: wx.getStorageSync('user_id'),
        },
      success:function(res){
        console.log(res)
        that.setData({ carts: res.data})
        that.refresh()
      }
    })
  }
})