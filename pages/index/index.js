  //index.js
//获取应用实例

const app = getApp()
const common = require('../../utils/common.js')
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    index:1,
    select_attr:0,
    num:1,
    goods_id:1,
  },
  
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    this.hideModal()
    var that = this
    wx.request({
      url: 'https://www.duonimytus.cn/wx_index.php',
      data:{cat:'all'},
      success:function(res){
        that.setData({
          goods:res.data,
        })
      }
    })
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  showModal: function (res) {
    // 显示遮罩层
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
    var goods = this.data.goods[res.currentTarget.id]
    console.log(this.data.goods)
    console.log(res.currentTarget)
    this.setData({
      cart: goods,
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
      num:1
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false
      })
    }.bind(this), 200)
  },
  clickAttr:function(res){
    console.log(res)
    var attr = []
    attr['id'] = res.currentTarget.id
    attr['text'] = res.currentTarget.dataset.text
    console.log(attr)
    wx.setStorageSync('attr_id', attr['id'])
    wx.setStorageSync('attr_text', attr['text'])
    this.setData({select_attr:attr['id'],s_attr:attr})
  },
  subtraction:function(res){
    if (this.data.num > 1){
      var newnum = this.data.num - 1
      this.setData({
        num: newnum
      })
    } 
  },
  add:function(res){
    if(this.data.num < 99){
      var newnum = this.data.num + 1
      this.setData({
        num: newnum
      })
    }
  },
  navto:function(res){
    console.log(res.currentTarget.id)
    switch (res.currentTarget.id){
      case '1': var name = '今日特价'
              break
      case '4': var name = '新品尝鲜'
              break
      case '5': var name = '创新中式'
              break
      case '6': var name = '下午茶点'
              break
      case '7': var name = '伴手礼品'
              break
      case 'all': var name = '所有产品'
    }
    console.log(name)
    wx.navigateTo({
      url: '../list/list?name=' + name + '&id=' + res.currentTarget.id,
    })
  },
  itemto:function(res){
    wx.navigateTo({
      url: '../detail/detail?goods_id=' + res.currentTarget.id,
    })
  },
  add_cart:function(res){
    var that = this
    var goods = this.data.cart
    var attr = wx.getStorageSync('attr')
    var num = this.data.num
    wx.request({
      url: 'https://www.duonimytus.cn/wx_cart.php',
      data:{
        mode:'insert',
        goods_number:num,
        goods_name:goods['name'],
        goods_id:goods['id'],
        user_id:wx.getStorageSync('user_id'),
        goods_price:goods['price'],
      },
      success:function(res){ 
        that.hideModal()
        wx.switchTab({
          url: '../cart/cart',
          success: function (e) {
            var page = getCurrentPages().pop();
            if (page == undefined || page == null) return;
            page.onLoad();
          }  
        })
      }
    })
  },
})
