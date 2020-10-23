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
        title: item.menuName,
        children: [],
      };
      buildtree(list, child.children, item.menuId);
      arr.push(child);
    }
  });
}
