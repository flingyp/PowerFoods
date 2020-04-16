Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 搜索框搜索内容
    value: '',
    // 搜索历史
    historyValue: [],
    // input初始值
    inputValue: '今天想吃什么'
  },
  // 输入框内容改变时 获取搜索框内容  
  getInputContent(e) {
    // 输入框内容
    const value = e.detail.value
    this.setData({
      value
    })
  },
  // 敲击回车 或者 点击搜索 跳转到 菜谱页面 food_menu
  goMenuDetail(e) {
    const historyValue = []
    // 获取 搜索框 中 输入的内容  
    const value = this.data.value
    // 把 输入的内容 存进 historyValue
    historyValue.push(value)
    // 并且 存进本地缓存中
    const history = wx.getStorageSync('searchHistory')
    if(!history) {
      wx.setStorageSync('searchHistory', {time: Date.now(), data: historyValue})
    } else {
      // 如果本有缓存 则 往本地缓存 放数据
      const newHistoryValue = [...history.data, ...historyValue]
      wx.setStorageSync('searchHistory', {tiem: Date.now(), data: newHistoryValue})
    }
    // 把本地缓存数据 存到  搜索历史中
    // this.setData({
    //   historyValue: wx.getStorageSync('searchHistory').data
    // })
    // 用于区分 首页 和 其他页面的数据 1 为 首页 2 为 其他的页面
    const api = 2
    // 跳转到 menu_detail 页面
    wx.navigateTo({
      url: `/pages/food_menu/food_menu?keyword=${this.data.value}&api=${api}`
    })
  },
  // 清空历史 数据
  clearHistory() {
    console.log('11')
    // 清空本地缓存的数据
    wx.removeStorage({
      key: 'searchHistory'
    })
    // 再 清空 搜索历史 historyValue 的数据
    wx.setStorageSync('searchHistory', {tiem: Date.now(), data: []})
    this.setData({
      historyValue: wx.getStorageSync('searchHistory').data
    })
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // // 获取 本地缓存 中 的搜索历史数据
    // const value = wx.getStorageSync('searchHistory').data
    // // 把 搜索历史 的数据 存入 搜索历史 historyValue 中
    // this.setData({
    //   historyValue: value
    // })
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
    // 获取 本地缓存 中 的搜索历史数据
    const value = wx.getStorageSync('searchHistory').data
    // 把 搜索历史 的数据 存入 搜索历史 historyValue 中
    this.setData({
      historyValue: value,
      inputValue: ''
    })
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