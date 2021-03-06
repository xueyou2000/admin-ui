import { MenuDataItem } from '@ant-design/pro-layout';
import { IRoute } from 'umi';

/**
 * 菜单格式转换
 *
 * @param menus SystemMenu菜单类型，并且是平级， 需要自行转换层级结构
 */
export function toLayourMenu(menus: SystemMenu[]): MenuDataItem[] {
  return menus.map(x => {
    return {
      // authority: x.perms,
      hideChildrenInMenu: x.hiddenChildren === 'TRUE',
      icon: x.icon,
      name: getMenuLastName(x.menuName),
      path: x.target === '_blank' ? x.path : x.menuKey,
      // target: x.target,
      // key: x.menuKey,
      children: toLayourMenu(x.children),
    };
  });
}

/**
 * 附带key字段
 * 因为getMatchMenu函数必须是依赖key来提取扁平菜单的
 */
export function toMenuKey(menus: MenuDataItem[]): MenuDataItem[] {
  return menus.map(x => {
    return {
      ...x,
      key: x.path,
      children: toMenuKey(x.children || []),
    };
  });
}

/**
 * 扁平路由
 */
export function flatRoute(data: IRoute[], parentName = '') {
  let keys: { [key: string]: IRoute } = {};
  data.forEach(item => {
    let name = parentName ? `${parentName}.${item.name}` : item.name;
    if (item.path) {
      keys[item.path] = { ...item, name };
    }
    if (item.routes && item.routes.length > 0) {
      keys = { ...keys, ...flatRoute(item.routes, name) };
    }
  });
  return keys;
}

/**
 * SystemMenu扁平菜单转层次结构
 *
 * @param menus
 * @param parentId
 */
export function toHierarchyMenu(menus: SystemMenu[], parentId = 0) {
  const _menus: SystemMenu[] = [];
  menus = menus.sort((x, y) => parseInt(x.orderNum) - parseInt(y.orderNum));
  menus.forEach(menu => {
    if (menu.parentId === parentId) {
      // 递归子菜单
      const children = menus.filter(x => x.parentId === menu.menuId);
      // const path = parentPath + menu.menuKey.replace(/^\//, '');
      // menu.menuKey = path;
      menu.children = toHierarchyMenu(children, menu.menuId);
      _menus.push(menu);
    }
  });
  return _menus;
}

/**
 * 获取菜单名称最后一级
 */
export function getMenuLastName(menuName: string) {
  if (menuName.indexOf('.') === -1) {
    return menuName;
  } else {
    const names = menuName.split('.');
    return names[names.length - 1];
  }
}
