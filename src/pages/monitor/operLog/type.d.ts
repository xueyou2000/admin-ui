interface OperLog {
  /** id */
  operId: number;
  /** 操作模块 */
  title: string;
  /** 操作类型 (sys_oper_type)  */
  businessType: number;
  /** 请求方法 */
  method: string;
  /** 请求方式 */
  requestMethod: string;
  /** 操作类别（0其它 1后台用户 2手机端用户） */
  operatorType: number;
  /** 操作人员 */
  operName: string;
  /** 部门名称 */
  deptName: string;
  /** 请求url */
  operUrl: string;
  /** 操作地址 */
  operIp: string;
  /** 操作地点 */
  operLocation: string;
  /** 请求参数 */
  operParam: string;
  /** 错误消息 */
  status: '0' | '1';
  /** 请求参数 */
  errorMsg: string;
  /** 操作时间 */
  operTime: string;
}

interface OperLogQuery extends QueryBase {
  operLog: OperLog;
}
