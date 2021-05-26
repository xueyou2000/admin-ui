import { toQueryBaseDto } from '@/utils/object-utils';
import request from '@/utils/request';

/**
 * 查询系统菜单
 *
 * @param menu 查询条件
 */
export function querySystemMenuList(data?: Partial<SystemMenu> & TableQueryParams) {
  const queryData = toQueryBaseDto<SystemMenu, SystemMenuQuery>('menu', data, ['createTime']);
  if (queryData.queryBaseDto) {
    queryData.queryBaseDto.direction = 'ASC';
    queryData.queryBaseDto.sortNames = ['order_num'];
  }

  return request
    .post<IResponse<IPage<SystemMenu>>>(`/system/menu/findByPage/999/1`, { data: queryData })
    .then(res => res.res);
}

/**
 * 新增系统菜单
 */
export function addSystemMenu(data: SystemMenu) {
  return request.post<IResponse>(`/system/menu/add`, { data });
}

/**
 * 修改系统菜单
 */
export function updateSystemMenu(data: SystemMenu) {
  return request.post<IResponse>(`/system/menu/update`, { data });
}

/**
 * 删除系统菜单
 */
export function removeSystemMenu(menuId: number) {
  return request.post<IResponse>(`/system/menu/remove`, { params: { menuId } });
}

/**
 * 获取角色所选权限
 */
export function getRolePermIds(roleId: number) {
  return request.post<IResponse<SystemMenu[]>>(`/system/menu/role/${roleId}`).then(res => res.res);
}

/**
 * 获取当前用户的菜单和权限
 */
export function getMenuPermissions() {
  return request.post<IResponse<SystemMenu[]>>(`/system/menu/permissions`).then(res => res.res);
}
