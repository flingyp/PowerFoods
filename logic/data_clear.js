// 对菜单页面的数据进行处理
export const menusDataClear = function(data) {
  // 第一步 删除 功效 人群 疾病 体制 类的信息
  data.splice(0,4)
  // 第二部 数据过多 只要部分
  data.forEach((item, index) => {
    // 对 菜品 厨房根据 场景类的数据 处理 只需要前面几条数据
    if(item.name === '菜品') {
      item.list.splice(10, (item.list.length-10))
    }
    if(item.name === '厨房用具') {
      item.list.splice(15, (item.list.length-15))
    }
    if(item.name === '场景') {
      item.list.splice(11, (item.list.length-11))
    }
  })
  return data
}


