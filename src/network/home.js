import { request1, request2 } from './request'

// 函数封装首页的请求
export function getHomeMultidata() {
  return request1({
    url: '/home/multidata'
  })
}
// 首页对于商品列表数据的请求  
// 需要参数获取相应类别和页数下的数据 type是请求的商品类型 - 流行 / 新款 / 精选 page是请求的页面 
export function getHomeGoods(type, page) {
  return request2({
    url: '/home/data',
    params: {
      type,
      page
    }
  })
}