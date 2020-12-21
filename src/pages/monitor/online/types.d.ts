/**
 * 在线用户
 */
interface UserOnline {
  /** 会话编号 */
  tokenId: string;
  /** 部门名称 */
  deptName: string;
  /** 用户名称 */
  loginName: string;
  /** 登录IP地址 */
  ipaddr: string;
  /** 登录地址 */
  loginLocation: string;
  /** 浏览器类型 */
  browser: string;
  /** 操作系统 */
  os: string;
  /** 登录时间 */
  loginTime: string;
}

/**
 * 在线用户查询参数
 */
interface UserOnlineQueryParams {
  /** 登陆账户 */
  loginName?: string;
  /** 登陆ip */
  ip?: string;
}
