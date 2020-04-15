import {getMenusData} from "../../logic/ajax_api.js"
import {menusDataClear} from "../../logic/data_clear.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 菜单页面接口地址
    menuUrl: 'https://api.jisuapi.com/recipe/class',
    key: '889d795d054a3d62',
    // 菜单数据
    menusData: []
  },
  getMenus(url, key) {
    getMenusData(url, key)
    .then(res => {
      if(res.statusCode === 200) {
        const data = res.data.result
        // 把接口数据存到本地存储中
        wx.setStorageSync('menus', {time:Date.now(), data: data})
        const menusData = menusDataClear(data)
        this.setData({
          menusData
        }) 
      }
    })
  },
  goMenuDetail(e) {
    // 获取 classid
    const classid = e.currentTarget.dataset.classid
    // 获取 名字
    const name = e.currentTarget.dataset.name
    // 跳转到 menu_detail 页面
    wx.navigateTo({
      url: `/pages/menu_detail/menu_detail?classid=${classid}&name=${name}`
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const url = this.data.menuUrl
    const key = this.data.key
    // 先获取本地存储的数据
    const Menus = wx.getStorageSync('menus')
    // 先判断 本地有没有缓存数据 
    if(!Menus) {
      // 没有缓存数据 则请求数据
      this.getMenus(url,key)
    } else {
      // 有缓存数据 定义过去时间 二个小时
      const timer = (1000*60*60)*2
      if(Date.now()-Menus.time>timer) {
        // 缓存数据 过期 重新发送请求数据
        this.getMenus(url,key)
      } else {
        // 可以使用 缓存 的数据
        console.log('使用缓存菜单的数据')
        const menusData = menusDataClear(Menus.data)
        this.setData({
          menusData
        })
      }
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