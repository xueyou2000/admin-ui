import request from '@/utils/request';

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

/**
 * 获取选择部门(数据权限) 用于选择
 */
export function getDeptIdsByRole(roleId: number) {
  return request.post<IResponse<number[]>>(`/system/dept/role/${roleId}`).then(res => res.res);
}

/**
 * 获取所有部门
 */
export function queryDeptAll() {
  return request.post<IResponse<Dept[]>>(`/system/dept/all`).then(res => res.res);
}

/**
 * 查询可用部门
 */
export function findEnableDepts() {
  return request
    .post<IResponse<Dept[]>>(`/system/dept/findEnableDepts`, { data: {} })
    .then(res => res.res);
}
