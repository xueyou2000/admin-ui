import request from '@/utils/request';

/**
 * 查询在线用户列表
 */
export function queryOnlineUserList(params: UserOnlineQueryParams) {
  return request
    .post<IResponse<UserOnline[]>>(`/api/monitor/online/list`, { params })
    .then(res => res.res);
}

/**
 * 强退用户
 */
export function forceLogout(tokenId: string) {
  return request.post<IResponse>(`/api/monitor/online/forceLogout`, { params: { tokenId } });
}
