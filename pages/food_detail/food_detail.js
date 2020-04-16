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
    // 其他页面的 接口地址
    otherUrl: 'https://api.jisuapi.com/recipe/detail',
    key: '889d795d054a3d62',
    // 轮播图 热门标签 猜你喜欢 其他页面 详情数据
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
    // 如果 api 为 1 用 shlUrl接口地址  为 2 则不用 shlUrl 接口地址
    // const api = options.api
    if(options.api == 1) {
      const url = this.data.shlUrl
      wx.showLoading({
        title: '加载中',
      })
      this.food_detail_data(url, this.data.id)
    } else if(options.api == 2) {
      let item = JSON.parse(options.item)
      item.material.forEach(item1 => {
        for(let key in item1) {
          if(key === 'mname') {
            item1.title = item1[key]
          }
        }
      })
      item.process.forEach((item1,index) => {
        for(let key in item1) {
          item1.position = index + 1
          item1.content = item1.pcontent
          item1.image = item1.pic
        }
      })
      const newtag = item.tag.split(",")
      item.tag = newtag
      this.setData({
        foodDetailData: item
      })
    }
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
    // 设置 导航栏 标题
    wx.setNavigationBarTitle({
      title: `${this.data.foodDetailData.name}`
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