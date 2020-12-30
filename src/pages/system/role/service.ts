import request from '@/utils/request';

/**
 * 查询角色
 */
export function queryRoleByPage(data?: Partial<Role> & TableQueryParams) {
  const { pageSize, current } = data || {};

  return request
    .post<IResponse<IPage<Role>>>(`/system/role/findByPage/${pageSize}/${current}`, {
      data,
    })
    .then(res => res.res);
}

/**
 * 删除角色
 */
export function removeRole(ids: number[]) {
  return request.post<IResponse>(`/system/role/remove`, { params: { ids } });
}

/**
 * 新增角色
 */
export function addRole(role: RoleModel) {
  return request.post<IResponse>(`/system/role/add`, { data: role });
}

/**
 * 修改角色
 */
export function updateRole(role: RoleModel) {
  return request.post<IResponse>(`/system/role/update`, { data: role });
}

/**
 * 保存角色分配数据权限
 */
export function authDataScopeSave(role: RoleModel) {
  return request.post<IResponse>(`/system/role/authDataScope`, { data: role });
}
