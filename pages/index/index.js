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
    var that = this
    wx.request({
      url: 'https://www.yuncms.online/tomato/wx.php',
      data:{},
      success:function(res){
        console.log(res.data)
        that.setData({
          goods:res.data,
          img1:res.data[0].img_url,
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
  showModal: function () {
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
      select_attr:0,
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
    var that = this
    that.setData({
      select_attr:res.currentTarget.id
    })
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
    wx.navigateTo({
      url: '../list/list?name=' + res.currentTarget.id,
    })
  },
  itemto:function(res){
    wx.navigateTo({
      url: '../detail/detail?goods_id=' + res.currentTarget.id,
    })
  }
})
