interface SystemUser {
  /** 用户id */
  userId: string;
  /** 部门id */
  deptId: number;
  /** 登录账号 */
  loginName: string;
  /** 用户名称 */
  userName: string;
  /** 状态 */
  status: '0' | '1';
  /** 用户类型 */
  userType: string;
  /** 邮箱 */
  email: string;
  /** 手机号 */
  phonenumber: string;
  /** 性别 (0=女性，1=男性) */
  sex: string;
  /** 头像 */
  avatar: string;
  /** 最后登陆ip */
  loginIp: string;
  /** 最后登陆时间 */
  loginDate: string;
  /** 备注 */
  remark: string;
  /** 直属部门 */
  dept: SystemDept;
  /** 角色 */
  roles: SystemRole[];
  /** 角色id集合 */
  roleIds: number[];
  /** 权限信息 */
  buttons: string[];
  /** 是否超级管理员 */
  admin: 'TRUE' | 'FALSE';
  /** 密码 */
  password: string;
}
