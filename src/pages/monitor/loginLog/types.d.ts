interface LoginInfo {
  /** id */
  infoId: number;
  /** 登陆用户账号 */
  loginName: string;
  /** 登陆用户ID */
  userId: string;
  /** 登录状态 */
  status: '0' | '1';
  /** 登录IP */
  ipaddr: string;
  /** 登录地点 */
  loginLocation: string;
  /** 浏览器类型 */
  browser: string;
  /** 操作系统 */
  os: string;
  /** 提示消息 */
  msg: string;
  /** 访问时间 */
  loginTime: string;
}

interface LoginInfoQuery extends QueryBase {
  loginInfo: LoginInfo;
}
