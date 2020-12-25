import request from '@/utils/request';
import { toQueryBaseDto } from '@/utils/object-utils';

/**
 * 查询定时任务日志
 */
export function queryJobLogByPage(data?: Partial<JobLog> & TableQueryParams) {
  const { pageSize, current } = data || {};
  const queryData = toQueryBaseDto<JobLog, JobLogQuery>('jobLog', data);

  return request
    .post<IResponse<IPage<JobLog>>>(`/monitor/jobLog/findByPage/${pageSize}/${current}`, {
      data: queryData,
    })
    .then(res => res.res);
}

/**
 * 删除定时任务日志
 */
export function removeJobLog(ids: number[]) {
  return request.post<IResponse>(`/monitor/jobLog/remove`, { params: { ids } });
}

/**
 * 清空定时任务日志
 */
export function cleanJobLog() {
  return request.post<IResponse>(`/monitor/jobLog/clean`);
}
