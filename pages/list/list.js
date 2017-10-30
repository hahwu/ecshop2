// pages/list/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      name:options.name
    })
    var that = this
    wx.request({
      url: 'https://www.yuncms.online/tomato/wx.php',
      data: {},
      success: function (res) {
        console.log(res.data)
        that.setData({
          goods: res.data,
          img1: res.data[0].img_url,
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
    var that = this
    that.setData({
      select_attr: res.currentTarget.id
    })
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
  navto: function (res) {
    wx.navigateTo({
      url: '../list/list?name=' + res.currentTarget.id,
    })
  },
  itemto: function (res) {
    wx.navigateTo({
      url: '../detail/detail?goods_id=' + res.currentTarget.id,
    })
  }
})