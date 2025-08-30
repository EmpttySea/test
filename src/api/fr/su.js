import request from '@/utils/request'

export const getsu = () => {
  return request({
    url: '/api/subject',
    method: 'get'
  })
}
export const postsu = (data) => {
  return request({
    url: '/api/subject',
    method: 'post',
    data: data
  })
}
export const deletesu = (id,data) => {
  return request({
    url: '/api/subject?id=' + id,
    method: 'delete',
    data: data
  })
}
export const patchsu = (id,data) => {
  return request({
    url: '/api/subject?id=' + id,
    method: 'patch',
    data: data
  })
}