// pages/mine/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 控制 未登录 和 登录 的显示隐藏
    show: false,
    // 用户信息
    info: {}
  },
  // 点击登录按钮 获取用户信息 bindgetuserinfo="getUserInfo"  open-type="getUserInfo" 使用
  getUserInfo(e) {
    console.log(e)
    // 获取到用户信息
    const userInfo = e.detail.userInfo
    const msg = e.detail.errMsg
    // 判断 用户是拒绝授权 还是 同意授权
    if(msg == 'getUserInfo:fail auth deny') {
      // 拒绝授权的情况下
      // 提示用户 授权失败
      wx.showToast({
        title: '您拒绝了授权',
        icon: 'none',
        duration: 2000,
        mask: true
      })
    } else if(msg == "getUserInfo:ok"){
      // 同意授权的情况下
      // 下一步 把信息存入本地缓存中
      const info = wx.getStorageSync('userInfo')
      if(!info) {
        // 如果本地缓存中 没有 用户信息 将获取到的最新用户信息存入本地缓存中
        wx.setStorageSync('userInfo', {time:Date.now(), userInfo})
        // 并且 显示登录后的样式
        this.setData({
          show: true,
          info: wx.getStorageSync('userInfo')
        })
      }
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    // 当本地缓存被清空时 用户信息失去 用户需要重新登录
    // 当本地缓存有用户信息 时 则显示登录时的样式
    const info = wx.getStorageSync('userInfo')
    if(!info) {
      // 页面显示 未登录的样式
      this.setData({
        show: false
      })
    } else {
      // 页面显示登录的样式
      this.setData({
        show: true
      })
      // 获取 用户登录的信息 info  并且将信息渲染再页面上
      this.setData({
        info
      })
    }
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

  }
})