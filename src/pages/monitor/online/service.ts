import request from '@/utils/request';

/**
 * 查询在线用户列表
 */
export function queryOnlineUserList(params: UserOnlineQueryParams) {
  return request
    .post<IResponse<UserOnline[]>>(`/monitor/online/list`, { params })
    .then(res => res.res);
}

/**
 * 强退用户
 */
export function forceLogout(tokenId: string) {
  return request.post<IResponse>(`/monitor/online/forceLogout`, { params: { tokenId } });
}
