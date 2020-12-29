import request from '@/utils/request';
import { toQueryBaseDto } from '@/utils/object-utils';

/**
 * 查询部门
 */
export function queryDeptByPage(data?: Partial<Dept> & TableQueryParams) {
  return request
    .post<IResponse<IPage<Dept>>>(`/system/dept/findByPage/999/1`, {
      data,
    })
    .then(res => res.res);
}

/**
 * 删除部门
 */
export function removeDept(ids: number[]) {
  return request.post<IResponse>(`/system/dept/remove`, { params: { ids } });
}

/**
 * 新增部门
 */
export function addDept(dept: Dept) {
  return request.post<IResponse>(`/system/dept/add`, { data: dept });
}

/**
 * 修改部门
 */
export function updateDept(dept: Dept) {
  return request.post<IResponse>(`/system/dept/update`, { data: dept });
}
