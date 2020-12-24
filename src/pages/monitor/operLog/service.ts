import request from '@/utils/request';
import { toQueryBaseDto } from '@/utils/object-utils';

/**
 * 查询操作日志
 */
export function queryOperLogByPage(data?: Partial<OperLog> & TableQueryParams) {
  const { pageSize, current } = data || {};
  const queryData = toQueryBaseDto<OperLog, OperLogQuery>('operLog', data);
  if (queryData.queryBaseDto) {
    queryData.queryBaseDto.sortNames = ['oper_time'];
  }

  return request
    .post<IResponse<IPage<OperLog>>>(`/api/monitor/operLog/findByPage/${pageSize}/${current}`, {
      data: queryData,
    })
    .then(res => res.res);
}

/**
 * 删除操作日志
 */
export function removeOperLog(ids: number[]) {
  return request.post<IResponse>(`/api/monitor/operLog/remove`, { params: { ids } });
}

/**
 * 清空操作日志
 */
export function cleanOperLog() {
  return request.post<IResponse>(`/api/monitor/operLog/clean`);
}

/**
 * 导出操作日志
 *
 * @returns 返回导出文件名称
 */
export function exportOperLog(data?: Partial<OperLog> & TableQueryParams) {
  const queryData = toQueryBaseDto<OperLog, OperLogQuery>('operLog', data || {});
  if (queryData.queryBaseDto) {
    queryData.queryBaseDto.sortNames = ['oper_time'];
  }

  return request
    .post<IResponse<string>>(`/api/monitor/operLog/export`, {
      data: queryData,
    })
    .then(res => res.res);
}
