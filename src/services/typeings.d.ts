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
