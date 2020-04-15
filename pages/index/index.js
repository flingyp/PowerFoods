import {getIndexSwiperData, getHotLikeData} from "../../logic/ajax_api.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 状态码
    statusCode: 200,
    // 首页轮播图接口地址
    swiperDataUrl: 'http://120.25.163.140:8091/home',
    // 热门标签的接口地址
    hotDataUrl: 'http://120.25.163.140:8091/recipe/list?keyword=热门标签',
    // 猜你喜欢的接口地址
    likeDataUrl: 'http://120.25.163.140:8091/recipe/list?keyword=猜你喜欢',
    // 存放轮播图数据
    swiperData: [],
    // 存放热门标签的数据
    hotData: [],
    // 存放猜你喜欢数据
    likeData: []
  },
  // 轮播图数据函数
  swiper_data() {
    const url = this.data.swiperDataUrl
    getIndexSwiperData(url)
    .then((res) => {
      if(res.statusCode === this.data.statusCode) {
        const data = res.data.result.header.dsps
        const swiperData = []
        // 对轮播图数据进行处理
        data.forEach((value, index) => {
          const swiper = {}
          // 轮播图的图片
          swiper.imgage = value.d.i
          // 轮播图的id
          const id = value.d.url.split("?id=")[1]
          swiper.id = id
          swiperData.push(swiper)
        })
        this.setData({
          swiperData
        })
      }
    })
  },
  // 热门标签的数据
  hot_data() {
    const url = this.data.hotDataUrl
    getHotLikeData(url)
    .then(res => {
      const data = res.data.result.list
      const hotData = []
      // 对 热门标签数据进行处理
      data.forEach((value, index) => {
        const hot = {}
        // 热门标签的图片
        hot.imgage = value.r.img
        // 热门标签的id 
        hot.id = value.r.id
        // 热门标签的 name
        hot.name = value.r.n
        hotData.push(hot)
      })
      this.setData({
        hotData
      })
    })
  },
  // 猜你喜欢的数据
  like_data() {
    const url = 'http://120.25.163.140:8091/recipe/list?keyword=猜你喜欢'
    getHotLikeData(url)
    .then(res => {
      const data = res.data.result.list
      const likeData = []
      // 对 热门标签数据进行处理
      data.forEach((value, index) => {
        const like = {}
        // 热门标签的图片
        like.imgage = value.r.img
        // 热门标签的id 
        like.id = value.r.id
        // 热门标签的 name
        like.name = value.r.n
        likeData.push(like)
      })
      this.setData({
        likeData
      })
    }) 
  },
  // 点击后 早餐 午餐 下午茶 晚餐 夜宵 进入 菜谱页面
  goFoodeMenu(e) {
    // console.log(e)
    // 点击获取对应的keyword关键字
    const keyword = e.currentTarget.dataset.keyword
    // 用于区分 首页 和 其他页面的数据 1 为 首页 2 为 其他的页面
    const api = 1
    // console.log(keyword)
    // 跳转到对应的页面
    wx.navigateTo({
      url: `/pages/food_menu/food_menu?keyword=${keyword}&api=${api}`
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.swiper_data()
    this.hot_data()
    this.like_data()
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

  }
})