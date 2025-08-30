import request from '@/utils/request'

export const getfr = () => {
  return request({
    url: '/api/finance-record',
    method: 'get',
  })
}
export const postfr = (data) => {
  return request({
    url: '/api/finance-record',
    method: 'post',
    data: data
  })
}
export const deletefr = (id) => {
  return request({
    url: '/api/finance-record?id=' + id,
    method: 'delete'
  })
}
export const patchfr = (data) => {
  return request({
    url: 'api/finance-record',
    method: 'post',
    data: data
  })
}
export function formatDateTime(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  
  return `${year}-${month}-${day}`;
}