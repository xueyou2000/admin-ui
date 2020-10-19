/**
 * 通用接口响应
 * 根据后台返回的接口定义， 并配置umi-request的错误适配器
 */
interface IResponse<T = any> {
  /** 状态码 0=响应成功 */
  status: number;
  /** 响应消息, success=响应成功 */
  message: string;
  /** 响应数据 */
  res: T;
  /** 重定向地址 */
  redirect?: string;
}

/**
 * 验证码插件的响应结构
 */
interface VerifyResponse<T = any> {
  /** 是否错误 */
  error: boolean;
  /** 是否成功 */
  success: boolean;
  /** 状态码: '0000'=响应成功 */
  repCode: string;
  /** 响应数据 */
  repData: T;
  /** 错误消息 */
  repMsg: string;
}

/**
 * 用户信息
 */
interface SystemUser {
  /** 用户id */
  userId: string;
  /** 部门id */
  deptId: number;
  /** 用户名称 */
  userName: string;
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
}

/**
 * 部门信息
 */
interface SystemDept {
  /** 部门id */
  deptId: number;
  /** 父部门id */
  parentId: number;
  /**
   * 祖级列表
   * 按照顺序的部门id字符串, 比如 0,100,102, 0=xx科技,100=深圳总公司,102=研发部门, 顺序按照层级关系递进
   */
  ancestors: string;
  /** 部门名称 */
  deptName: string;
  /** 显示顺序 */
  orderNum: string;
  /** 负责人 */
  leader: string;
  /** 负责人id */
  leaderId: string;
  /** 联系电话 */
  phone: string;
  /** 邮箱 */
  email: string;
  /** 部门状态 (0=正常, 1=停用) */
  status: string;
}

/**
 * 角色信息
 */
interface SystemRole {
  /** 角色id */
  roleId: number;
  /** 角色名称 */
  roleName: string;
  /** 角色权限字符串 */
  roleKey: string;
  /** 角色排序 */
  roleSort: string;
  /** 数据范围（1：所有数据权限；2：自定数据权限） */
  dataScope: string;
  /** 角色状态（0正常 1停用） */
  status: string;
  /** 备注 */
  remark: string;
}
