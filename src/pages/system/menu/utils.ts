import { useEffect, useState } from 'react';
import { getIntl, getLocale, useIntl } from 'umi';
import { querySystemMenuList } from './service';

/**
 * 创建树形列表组建需要的数据格式
 *
 * @param list
 * @param arr
 * @param parentId
 */
export function buildtree(list: SystemMenu[], arr: any[], parentId: number) {
  list.forEach(item => {
    if (item.parentId === parentId) {
      var child = {
        key: item.menuId,
        value: item.menuId,
        title: getMenuName(item, list),
        children: [],
      };
      buildtree(list, child.children, item.menuId);
      arr.push(child);
    }
  });
}

/**
 * 管理权限树形数据
 */
export function useSystemPermissions() {
  const [permissions, setPermissions] = useState([{ key: 0, value: 0, title: '无' }]);

  useEffect(() => {
    querySystemMenuList({}).then(page => {
      const treeData = [{ key: 0, value: 0, title: '无' }];
      buildtree(page.records, treeData, 0);
      setPermissions(treeData);
    });
  }, []);

  return { permissions };
}

export function getMenuName(menu: SystemMenu, menus: SystemMenu[]) {
  const intl = getIntl(getLocale());

  let fullMenuKey = 'menu.';
  if (menu.parentId !== 0) {
    const parent = menus.find(x => x.menuId === menu.parentId);
    if (parent) {
      fullMenuKey = fullMenuKey + parent.menuName + '.';
    }
  }
  return intl.formatMessage({ id: fullMenuKey + menu.menuName, defaultMessage: menu.menuName });
}
