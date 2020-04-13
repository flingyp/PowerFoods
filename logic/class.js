// 菜谱 详情信息
class foodDetail {
  constructor({imgage, name, tag, content, material, process}) {
    this.imgage = imgage,
    this.name = name,
    this.tag = tag,
    this.content = content,
    this.material = material,
    this.process = process
  }
}
// new 出 菜谱详情信息 对象
export function createFoodDetail(item) {
  return new foodDetail({
    imgage: item.imgage,
    name: item.name,
    tag: item.tag,
    content: item.content,
    material: item.material,
    process: item.process
  })
}