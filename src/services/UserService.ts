import request from '@/utils/request';

/**
 * 查询当前登陆用户信息
 */
export function queryCurrentUser() {
  return request.post<IResponse<SystemUser>>('/system/user/info').then(res => res.res);
}
