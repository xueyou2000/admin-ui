import request from '@/utils/request';
import { toQueryBaseDto } from '@/utils/object-utils';

/**
 * 查询定时任务
 */
export function queryJobByPage(data?: Partial<Job> & TableQueryParams) {
  const { pageSize, current } = data || {};
  const queryData = toQueryBaseDto<Job, JobQuery>('job', data);

  return request
    .post<IResponse<IPage<Job>>>(`/monitor/job/findByPage/${pageSize}/${current}`, {
      data: queryData,
    })
    .then(res => res.res);
}

/**
 * 删除定时任务
 */
export function removeJob(ids: number[]) {
  return request.post<IResponse>(`/monitor/job/remove`, { params: { ids } });
}

/**
 * 新增定时任务
 */
export function addJob(job: Job) {
  return request.post<IResponse>(`/monitor/job/add`, { data: job });
}

/**
 * 修改定时任务
 */
export function updateJob(job: Job) {
  return request.post<IResponse>(`/monitor/job/update`, { data: job });
}

/**
 * 定时任务状态修改
 */
export function changeJobStatus(jobId: number, status: '0' | '1') {
  return request.post<IResponse>(`/monitor/job/changeStatus`, { data: { jobId, status } });
}

/**
 * 立即执行定时任务
 */
export function runTask(job: Job) {
  return request.post<IResponse>(`/monitor/job/run`, { data: job });
}
