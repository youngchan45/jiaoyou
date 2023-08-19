import request from '@/utils/request'

/* /sys/xzyh 新增用户，/sys/jrfk 今日访客， /sys/zsy 总收益
zsy 查询字段 pageNo 页数，pageSize 页大小
/sys/zsy 收益查询 查询字段 pageNo 页数，pageSize 页大小 ，openid 用户 id 非必需，status -支付状态，非必需 0-未支付，1-已支付 */

//新增用户
export function xzyh(query) {
  return request({
    url: '/sys/xzyh',
    method: 'get',
    params: query
  })
}

// 今日访客
export function jrfk(query) {
  return request({
    url: '/sys/jrfk',
    method: 'get',
    params: query
  })
}

// 总收益
/* 查询字段 pageNo 页数，pageSize 页大小 ，openid 用户 id 非必需，status -支付状态，非必需 0-未支付，1-已支付 */
export function zsy(query) {
    return request({
      url: '/sys/zsy',
      method: 'get',
      params: query
    })
  }

  // 查询学校管理列表
  export function listXx(query) {
    return request({
      url: '/system/xx/list',
      method: 'get',
      params: query
    })
  }
  
  // 查询学校管理详细
  export function getXx(name) {
    return request({
      url: '/system/xx/' + name,
      method: 'get'
    })
  }
  
  // 新增学校管理
  export function addXx(data) {
    return request({
      url: '/system/xx',
      method: 'post',
      data: data
    })
  }
  
  // 修改学校管理
  export function updateXx(data) {
    return request({
      url: '/system/xx',
      method: 'put',
      data: data
    })
  }
  
  // 删除学校管理
  export function delXx(name) {
    return request({
      url: '/system/xx/' + name,
      method: 'delete'
    })
  }
  