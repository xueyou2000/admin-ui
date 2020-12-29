/**
 * 部门
 */
interface Dept {
  /** 部门id */
  deptId: number;
  /** 父部门id */
  parentId: number;
  /** 祖级列表 */
  ancestors: string;
  /** 部门名称 */
  deptName: string;
  /** 显示顺序 */
  orderNum: number;
  /** 负责人 */
  leader: string;
  /** 负责人编号 */
  leaderId: number;
  /** 联系电话 */
  phone: string;
  /** 邮箱 */
  email: string;
  /** 部门状态（0正常 1停用） */
  status: '0' | '1';
  /** 删除标志（0代表存在 2代表删除） */
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
