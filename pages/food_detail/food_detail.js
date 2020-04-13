import {getFoodDetailData} from '../../logic/ajax_api.js'
import {createFoodDetail} from '../../logic/class.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 状态码
    statusCode: 200,
    // 用来判断
    show: false,
    // 轮播图 热门标签 猜你喜欢 传递过来的id值
    id: '',
    // 轮播图 热门标签 猜你喜欢 接口地址
    shlUrl: 'http://120.25.163.140:8091/recipe/detail',
    // 轮播图 热门标签 猜你喜欢 详情数据
    foodDetailData: {}
  },
  food_detail_data(url, id) {
    getFoodDetailData(url, id)
    .then(res => {
      if(res.statusCode === this.data.statusCode) {
        // console.log(res)
        const data = res.data.result.recipe
        const item = {
          imgage: data.image,
          name: data.title,
          tag: data.tag,
          content: data.cookstory,
          material: data.major,
          process: data.cookstep
        }
        const foodDetailData = createFoodDetail(item)
        wx.hideLoading()
        this.setData({
          foodDetailData
        })
        wx.setNavigationBarTitle({
          title: this.data.foodDetailData.name
       })
      } else {
        console.log('菜谱审核中')
        wx.hideLoading()
        this.setData({
          show: true
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 轮播图 热门标签 猜你喜欢 传递过来的id 值 通过 options 可以 页面参数 id
    this.setData({
      id: options.id
    })
    const url = this.data.shlUrl
    wx.showLoading({
      title: '加载中',
    })
    this.food_detail_data(url, this.data.id)
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