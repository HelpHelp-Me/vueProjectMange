import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/vue-element-admin/user/login',
    method: 'post',
    data
  })
}

export function getAllTags() {
  return request({
    url: '/api/tags/getAllTags',
    method: 'get'
  })
}

