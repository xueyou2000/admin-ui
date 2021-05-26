import { useEffect, useState } from 'react';
import { queryDeptByPage } from './service';

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

/**
 * 系统部门树形数据
 */
export function useSystemDepts(emptyLabel = '无') {
  const [depts, setDepts] = useState([{ key: 0, value: 0, title: emptyLabel }]);

  useEffect(() => {
    queryDeptByPage({}).then(page => {
      const treeData = [{ key: 0, value: 0, title: emptyLabel }];
      buildtree(page.records, treeData, 0);
      setDepts(treeData);
    });
  }, []);

  return { depts };
}
