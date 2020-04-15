// 请求 首页 轮播图数据
export const getIndexSwiperData = function(url) {
  return new Promise((resolve, reject) => {
    wx.request({
      url,
      success(res) {
        resolve(res);
      },
      fail(err) {
        reject(err);
      }
    })
  })
}


// 请求 热门标签 猜你喜欢 数据
export const getHotLikeData = function(url) {
  return new Promise((resolve, reject) => {
    wx.request({
      url,
      success(res) {
        resolve(res);
      },
      fail(err) {
        reject(err);
      }
    })
  })
}

// 轮播图 热门标签 猜你喜欢 菜详情 数据
export const getFoodDetailData = function(url, id) {
  return new Promise((resolve, reject) => {
    wx.request({
      url,
      data: {
        id
      },
      success(res) {
        resolve(res)
      },
      fail(err) {
        reject(err)
      }
    })
  })
}

// 菜单页面 数据
export const getMenusData = function(url, appkey) {
  return new Promise((resolve, reject) => {
    wx.request({
      url,
      data: {
        appkey
      },
      success(res) {
        resolve(res)
      },
      fail(err) {
        reject(err)
      }
    })
  })
}

// 早餐 午餐 下午茶 晚餐 夜宵 菜谱搜索 数据
export const getInexData = function(url,keyword,appkey,start) {
  return new Promise((resolve, reject) => {
    wx.request({
      url,
      data: {
        appkey,
        keyword,
        start
      },
      success(res) {
        resolve(res)
      },
      fail(err) {
        reject(err)
      } 
    })
  })
}

// 菜单页面 菜谱搜索 数据
export const getMenusDetailData = function(url,classid,appkey,start, num) {
  return new Promise((resolve, reject) => {
    wx.request({
      url,
      data: {
        appkey,
        classid,
        start,
        num
      },
      success(res) {
        resolve(res)
      },
      fail(err) {
        reject(err)
      } 
    })
  })
}
