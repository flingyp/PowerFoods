### 页面：

+ 首页        index
+ 菜单页      menus
+ 我的页面   mine
+ 搜索页面   search
+ 菜详情页面   food_detail

### 技术选型

+ 微信小程序原生框架
+ less

### 收获
  + 通过一个简单的小程序来基本的了解微信小程序的相关组件和API的知识
  + 了解微信小程序项目开发的基本流程
  + 为后面微信小程序云开发的了解和使用奠定一定的基础


### 记录一下有用的方法和踩过的坑
*1.在微信小程序中使用less语法*
+ https://zhuanlan.zhihu.com/p/64928515

*2.轮播图图片滑动的时候会先变成直角然后变成圆角问题*
+ 在 swiper 标签添加 两条属性
  + overflow: hidden;
  + transform: translateY(0);

*3.使用Iconfont 多彩图标的话 参考这篇文章*
+ https://blog.csdn.net/qq_42001842/article/details/103959394
+ 如果使用是单色的图标可以另外引入 样式文件

*4.微信小程序scroll-view左右横向滑动遇到的小细节*
+ https://blog.csdn.net/qq_36742720/article/details/84774738

*5.真机调试的时候 scroll-view 滚动的时候出现滚动条 隐藏的方法*
```css
  /* 复制到样式文件里 */
  ::-webkit-scrollbar{
    width: 0;
    height: 0;
    color: transparent;
  }
```

*6. 菜详情页数据格式*
```json
  {
    // 菜的图片
    'imgage': 'xxx',
    // 菜的名字
    'name': 'xxx',
    // 菜的标签
    'tag': 'xxx',
    // 菜的内容
    'content': 'xxx',
    // 菜的材料
    'material': 'xxx',
    // 菜的步骤
    'process': 'xxx'  
  }
```

*6.解决 wx:if else 引起的 先显示后隐藏的问题（内容闪烁问题）*
 + 解决方案：先用一个变量让其隐藏，当从接口中获得数据的时候，在把这个 show 设置成 true 。这样出来的效果就是，内容逐渐在显示，依次显示。从而看不到闪烁再隐藏。
```js
  data: {
    // 用来判断
    show: false
  }
  // 当没有菜品信息的适合 让它显示
  else {
    console.log('菜谱审核中')
    wx.hideLoading()
    this.setData({
      show: true
    })
  }
  // 在wxml 中
  <view class="name" wx:if="{{!foodDetailData.name && show}}">抱歉，未找到相关菜品的信息</view>
```
  