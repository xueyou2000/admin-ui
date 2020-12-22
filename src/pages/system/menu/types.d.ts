/**
 * 系统菜单
 */
interface SystemMenu {
  /** 菜单id */
  menuId: number;
  /** 菜单名称 */
  menuName: string;
  /** 父菜单名称 */
  parentName: string;
  /** 父菜单名id */
  parentId: number;
  /** 打开方式 (_blank新窗口) */
  target: string;
  /** 显示顺序 */
  orderNum: string;
  /** 类型: (M目录,C菜单,F按钮) */
  menuType: 'M' | 'C' | 'F';
  /** 菜单URL */
  menuKey: string;
  /** 组件 */
  component: string;
  /** 菜单状态:0显示,1隐藏 */
  visible: string;
  /** 权限字符串 */
  perms: string;
  /** 菜单图标 */
  icon: string;
  /** 链接地址 */
  path: string;
  /** 重定向地址 */
  redirect: string;
  /** 隐藏子菜单 */
  hiddenChildren: 'TRUE' | 'FALSE';
}

interface SystemMenuQuery extends QueryBase {
  menu?: SystemMenu;
}
