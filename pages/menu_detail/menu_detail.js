import {getMenusDetailData} from '../../logic/ajax_api'
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
      classid: '',
      // 起始条数
      start: 0,
      // 菜谱详情 接口地址
      menusUrl: 'https://api.jisuapi.com/recipe/byclass',
      // 菜谱数据
      foodMenuData: [],
      // 数据 条数
      num: 15
  },
  // 请求数据函数
  menusDetailData(url,classid,appkey,start,num) {
    getMenusDetailData(url,classid,appkey,start, num) 
    .then(res => {
      if(res.statusCode === this.data.statusCode) {
        console.log(res)
        const data = res.data.result
        // 把接口数据存到本地存储中
        wx.setStorageSync('foodMenuDetail', {time:Date.now(), data: data})
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
    wx.setNavigationBarTitle({
      title: `${options.name}`
    })
    const classid = options.classid
    this.setData({
      classid
    })
    const url = this.data.menusUrl
    const appkey = this.data.key
    const start = this.data.start
    const num = this.data.num
    this.menusDetailData(url,classid,appkey, start, num)
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
    const url = this.data.menusUrl
    const classid = this.data.classid
    const key = this.data.key
    const start = this.data.start + 1
    const num = this.data.num
    this.setData({
      start
    })
    wx.showLoading({
      title: '加载中',
    })
    // 获取更多数据
    getMenusDetailData(url,classid,key, start, num).
    then(res => {
      if(res.statusCode === this.data.statusCode) {
        console.log(res)
        const data = res.data.result
        // 把接口数据接入本地存储foodMenu中
        const foodMenuDetail = wx.getStorageSync('foodMenuDetail')
        const list  = foodMenuDetail.data.list
        data.list.unshift(...list)
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