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