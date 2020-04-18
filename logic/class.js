// 菜谱 详情信息
class foodDetail {
  constructor({imgage, name, tag, content, material, process, collect,id}) {
    this.imgage = imgage
    this.name = name
    this.tag = tag
    this.content = content
    this.material = material
    this.process = process
    this.ifCollect = collect
    this.id = id
  }
}
// new 出 菜谱详情信息 首页页面的 对象
export function createFoodDetail(item) {
  return new foodDetail({
    imgage: item.imgage,
    name: item.name,
    tag: item.tag,
    content: item.content,
    material: item.material,
    process: item.process,
    collect: item.collect,
    id: item.id
  })
}

// new 出 其他页面的对象
export function createFoodDetail2(item) {
  return new foodDetail({
    imgage: item.pic,
    name: item.name,
    tag: item.tag,
    content: item.content,
    material: item.material,
    process: item.process,
    id: item.id
  })
}