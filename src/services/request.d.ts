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
