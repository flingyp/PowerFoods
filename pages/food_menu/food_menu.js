import {getInexData} from "../../logic/ajax_api"
import {createFoodDetail2} from '../../logic/class'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 状态码
    statusCode: 200,
    key: '889d795d054a3d62',
    // 关键字
    keyword: '',
    // 起始条数
    start: 0,
    // 早餐 午餐 下午茶 晚餐 夜宵 接口地址
    indexUrl: `https://api.jisuapi.com/recipe/search`,
    // 菜谱数据
    foodMenuData: []
  },

  indexData(url,keyword, key, start) {
    getInexData(url,keyword,key, start)
    .then(res => {
      if(res.statusCode === this.data.statusCode) {
        const data = res.data.result
        // console.log(data)
        // 把接口数据存到本地存储中
        wx.setStorageSync('foodMenu', {time:Date.now(), data: data})
        this.setData({
          foodMenuData: data.list
        })
      }
    })
  },
  goFoodDetail(e) {
    // 用于区分 首页 和 其他页面的数据 1 为 首页 2 为 其他的页面
    const api = 2
    const item = JSON.stringify(createFoodDetail2(e.currentTarget.dataset.item))
    // 跳转到食物详情页面 携带菜谱 信息
    wx.navigateTo({
      url: `/pages/food_detail/food_detail?item=${item}&api=${api}`,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const keyword = options.keyword
    wx.setNavigationBarTitle({
      title: `${keyword}`
    })
    this.setData({
      keyword
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    const url = this.data.indexUrl
    const keyword = this.data.keyword
    const key = this.data.key
    const start = this.data.start
    this.indexData(url,keyword,key,start) 
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
    // console.log('11')
    const url = this.data.indexUrl
    const keyword = this.data.keyword
    const key = this.data.key
    const start = this.data.start + 1
    this.setData({
      start
    })
    wx.showLoading({
      title: '加载中',
    })
    // 获取更多数据
    getInexData(url,keyword,key, start).
    then(res => {
      if(res.statusCode === this.data.statusCode) {
        const data = res.data.result
        // console.log(data)
        // 把接口数据接入本地存储foodMenu中
        const foodMenu = wx.getStorageSync('foodMenu')
        const list  = foodMenu.data.list
        data.list.unshift(...list)
        // wx.setStorageSync('foodMenu', {time:Date.now(), data: foodMenu})
        this.setData({
          foodMenuData: data.list
        })
        wx.hideLoading()
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})