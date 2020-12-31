import request from '@/utils/request';

/**
 * 查询用户
 */
export function queryUserByPage(data?: Partial<SystemUser> & TableQueryParams) {
  const { pageSize, current } = data || {};

  return request
    .post<IResponse<IPage<SystemUser>>>(`/system/user/findByPage/${pageSize}/${current}`, {
      data,
    })
    .then(res => res.res);
}

/**
 * 删除用户
 */
export function removeUser(ids: string[]) {
  return request.post<IResponse>(`/system/user/remove`, { params: { ids } });
}

/**
 * 新增用户
 */
export function addUser(user: SystemUser) {
  return request.post<IResponse>(`/system/user/add`, { data: user });
}

/**
 * 修改用户
 */
export function updateUser(user: SystemUser) {
  return request.post<IResponse>(`/system/user/update`, { data: user });
}

/**
 * 重置密码
 */
export function restPassword(userId: string, password: string) {
  return request.post<IResponse>(`/system/user/resetPwd`, { params: { userId, newPassword: password } });
}

/**
 * 修改状态
 */
export function changeStatus(userId: string, status: string) {
  return request.post<IResponse>(`/system/user/changeStatus`, { params: { userId, status } });
}

/**
 * 获取用户信息根据id
 */
export function selectUserById(userId: string) {
  return request.post<IResponse<SystemUser>>(`/system/user/get/${userId}`).then(res => res.res);
}
