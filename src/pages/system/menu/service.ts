import request from '@/utils/request';

/**
 * 查询系统菜单
 *
 * @param menu 查询条件
 */
export function querySystemMenuList(data?: Partial<SystemMenu> & QueryParams & QueryBaseDto) {
  return request
    .post<IResponse<IPage<SystemMenu>>>(`/api/system/menu/findByPage/999/1`, { data: { data } })
    .then(res => res.res);
}

/**
 * 新增系统菜单
 */
export function addSystemMenu(data: SystemMenu) {
  return request.post<IResponse>(`/api/system/menu/add`, { data });
}
