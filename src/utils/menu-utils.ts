import { MenuDataItem } from '@ant-design/pro-layout';

/**
 * 菜单格式转换
 *
 * @param menus SystemMenu菜单类型，并且是平级， 需要自行转换层级结构
 */
export function toLayourMenu(menus: SystemMenu[]): MenuDataItem[] {
  return menus.map(x => {
    return {
      authority: x.perms,
      hideChildrenInMenu: x.hiddenChildren === '0',
      icon: x.icon,
      name: x.menuName,
      path: x.target === '_blank' ? x.path : x.menuKey,
      target: x.target,
      // key: x.menuKey,
      children: toLayourMenu(x.children),
    };
  });
}

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
 * SystemMenu扁平菜单转层次结构
 *
 * @param menus
 * @param parentId
 */
export function toHierarchyMenu(menus: SystemMenu[], parentId = 0, parentPath = '/') {
  const _menus: SystemMenu[] = [];
  menus = menus.sort((x, y) => parseInt(x.orderNum) - parseInt(y.orderNum));
  menus.forEach(menu => {
    if (menu.parentId === parentId) {
      // 递归子菜单
      const children = menus.filter(x => x.parentId === menu.menuId);
      const path = parentPath + menu.menuKey.replace(/^\//, '');
      menu.menuKey = path;
      menu.children = toHierarchyMenu(children, menu.menuId, path + '/');
      _menus.push(menu);
    }
  });
  return _menus;
}
