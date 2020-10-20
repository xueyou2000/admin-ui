import request from '@/utils/request';

/**
 * 查询当前登陆用户信息
 */
export function queryCurrentUser() {
  return request.post<IResponse<SystemUser>>('/system/user/info').then(res => res.res);
}

/**
 * 查询当前登陆用户菜单
 */
export function queryCurrentMenus() {
  return request.post<IResponse<SystemMenu[]>>('/system/menu/user').then(res => res.res);
}

/**
 * 查询当前登陆用户通知
 */
export function queryNotices() {
  return request.post<IResponse>('/system/notices/user').then(res => res.res);
}
