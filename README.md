### 页面：

+ 首页        index
+ 菜单页      menus
+ 我的页面   mine
+ 搜索页面   search
+ 菜详情页面   food_detail

### 技术选型

+ 微信小程序原生框架
+ less

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