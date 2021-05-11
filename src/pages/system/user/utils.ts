import { useEffect, useState } from 'react';
import { findEnableDepts } from '../dept/service';

/**
 * 创建树形列表组建需要的数据格式
 *
 * @param list
 * @param arr
 * @param parentId
 */
export function buildtree(list: Dept[], arr: any[], parentId: number, ancestors: string[]) {
  list.forEach(item => {
    if (item.parentId === parentId) {
      var child = {
        key: item.deptId,
        value: item.deptId,
        title: item.deptName,
        disabled: ancestors.find(id => id == item.deptId + '') != null,
        children: [],
      };
      buildtree(list, child.children, item.deptId, ancestors);
      arr.push(child);
    }
  });
}

interface TreeData {
  key: number;
  value: number | string;
  title: string;
  children: TreeData[];
}

/**
 * 管理部门树形数据
 */
export function useDepts(currentUser?: SystemUser) {
  const [depts, setDepts] = useState<TreeData[]>([]);
  useEffect(() => {
    findEnableDepts().then(res => {
      // 过滤自己及以上部门，不能给上级部门创建用户
      const ancestors = (currentUser?.dept.ancestors || '').split(',');
      const treeData: TreeData[] = [];
      buildtree(res, treeData, 0, ancestors);
      setDepts(treeData);
    });
  }, []);

  return { depts };
}
