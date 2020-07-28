import request from '@/utils/request'

/// 登录
export function login(data) {
  return request({
    url: '/user/login/login',
    method: 'post',
    data
  })
}

//  登录用户信息
export function getInfo() {
  return request({
    url: '/admin/index/userInfo',
    method: 'get'
  })
}

//  用户列表
export function userLists(params) {
  return request({
    url: '/admin/user/userlist',
    method: 'get',
    params
  })
}
 
//  删除用户
export function deleteUset(data) {
  return request({
    url: '/admin/user/deluser',
    method: 'post',
    data
  })
}

//  添加用户
export function addUser(data) {
  return request({
    url: '/admin/user/addUser',
    method: 'post',
    data
  })
}

// 用户名列表
export function userName() {
  return request({
    url: '/admin/user/userName',
    method: 'get', 
  })
}
 
// 编辑时候用户信息
export function userInfoEdit(data) {
  return request({
    url: '/admin/user/userinfo',
    method: 'get',
    params: data
  })
}

// 编辑时候用户信息
export function roleLists() {
  return request({
    url: '/admin/role/roleList',
    method: 'get', 
  })
}

//  修改用户信息
export function updateUser(data) {
  return request({
    url:'/admin/user/updateUser',
    method: 'post',
    data
  })
}

// 权限管理列表
export function authLists(params) {
  return request({
    url:'/admin/rule/ruleList',
    method: 'get',
    params
  })
}

// 添加权限
export function addAuth(data) {
  return request({
    url:'/admin/rule/addrule',
    method: 'post', 
    data
  })
}

//  编辑权限
export function editAuth (data) {
  return request({
    url: '/admin/rule/editrule',
    method: 'post',
    data
  })
}

// 删除权限
export function deleteAuth(data) {
  return request({
    url: '/admin/rule/delrule',
    method: 'post',
    data
  })
}

//  添加角色
export function addRole (data) {
  return request({
    url: '/admin/role/addrole',
    method: 'post',
    data
  })
}

// 删除角色
export function deleteRole (params) {
  return request({
    url: '/admin/role/delrole',
    method: 'get',
    params
  })
}

// 编辑角色
export function editRole (data) {
  return request({
    url: '/admin/role/editrole',
    method: 'post',
    data
  })
}












 
