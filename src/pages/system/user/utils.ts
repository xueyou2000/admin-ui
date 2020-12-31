import { useEffect, useState } from 'react';
import { findEnableDepts } from '../dept/service';

/**
 * 创建树形列表组建需要的数据格式
 *
 * @param list
 * @param arr
 * @param parentId
 */
export function buildtree(list: Dept[], arr: any[], parentId: number) {
  list.forEach(item => {
    if (item.parentId === parentId) {
      var child = {
        key: item.deptId,
        value: item.deptId,
        title: item.deptName,
        children: [],
      };
      buildtree(list, child.children, item.deptId);
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
export function useDepts() {
  const [depts, setDepts] = useState<TreeData[]>([]);
  useEffect(() => {
    findEnableDepts().then(res => {
      const treeData: TreeData[] = [];
      buildtree(res, treeData, 0);
      setDepts(treeData);
    });
  }, []);

  return { depts };
}
