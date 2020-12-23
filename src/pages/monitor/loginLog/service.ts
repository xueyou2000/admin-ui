import request from '@/utils/request';
import { toQueryBaseDto } from '@/utils/object-utils';

/**
 * 查询登陆日志
 */
export function queryLoginLogByPage(data?: Partial<LoginInfo> & TableQueryParams) {
  const { pageSize, current } = data || {};
  const queryData = toQueryBaseDto<LoginInfo, LoginInfoQuery>('loginInfo', data);
  if (queryData.queryBaseDto) {
    queryData.queryBaseDto.sortNames = ['login_time'];
  }

  return request
    .post<IResponse<IPage<LoginInfo>>>(`/api/monitor/loginInfo/findByPage/${pageSize}/${current}`, {
      data: queryData,
    })
    .then(res => res.res);
}

/**
 * 删除登陆日志
 */
export function removeLoginLog(ids: number[]) {
  return request.post<IResponse>(`/api/monitor/loginInfo/remove`, { params: { ids } });
}

/**
 * 清空登陆日志
 */
export function cleanLoginLog() {
  return request.post<IResponse>(`/api/monitor/loginInfo/clean`);
}
