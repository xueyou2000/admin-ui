/**
 * 角色
 */
interface Role {
  /** 角色Id */
  roleId: number;
  /** 角色名称 */
  roleName: string;
  /** 角色权限字符串 */
  roleKey: string;
  /** 显示顺序 */
  roleSort: number;
  /** 数据范围*/
  dataScope: string;
  /** 角色状态 */
  status: '0' | '1';
  /** 备注 */
  remark: string;
  /** 删除标志 */
  delFlag: '0' | '2';
  /** 创建者 */
  createBy: string;
  /** 创建时间 */
  createTime: string;
  /** 更新者 */
  updateBy: string;
  /** 更新时间 */
  updateTime: string;
}

interface RoleModel extends Role {
  /** 所选菜单/权限 */
  menuIds: number[];
  /** 所选自定义部门 */
  deptIds: number[];
}
