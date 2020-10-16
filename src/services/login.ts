import request from '@/utils/request';

/**
 * 验证码信息
 * 验证码基于anji-captcha @see https://gitee.com/anji-plus/captcha
 */
export interface CaptchaInfo {
  originalImageBase64: string;
  jigsawImageBase64: string;
  token: string;
  secretKey: string;
}

/**
 * 获取验证码
 */
export function getCaptcha() {
  return request.post<CaptchaInfo>('/captcha/get2', { data: { captchaType: 'blockPuzzle' } });
}

/**
 * 校验验证码参数
 */
export interface CheckCaptchaParams {
  /** 验证码类型 */
  captchaType: 'blockPuzzle';
  /** 滑块结果. 需要做aesEncrypt(JSON.stringify({ x: moveLeftDistance, y: 5.0 }), secretKey) 计算得出 */
  pointJson: string;
  /** /captcha/get 接口返回的token */
  token: string;
}

/**
 * 校验验证码
 */
export function checkCaptcha(params: CheckCaptchaParams) {
  return request
    .post<{ result: boolean }>('/captcha/check', { data: params })
    .then(res => res.result);
}

/**
 * 登陆参数
 */
export interface LoginParams {
  /** 登陆账号 */
  username: string;
  /** 登陆密码 */
  password: string;
  /** 验证码 */
  captchaVO: {
    /** 验证token aesEncrypt(token + '---' + JSON.stringify({ x: moveLeftDistance, y: 5.0 }), secretKey) */
    captchaVerification: string;
  };
}

/**
 * 登陆响应
 */
export interface LoginRes {
  /** 授权token */
  token: string;
  /** token过期时间(秒) */
  expire: number;
  /** 用户id */
  userId: number;
}

/**
 * 滑块验证登陆
 */
export function login(params: LoginParams) {
  return request.post<LoginRes>('/login/captcha', { data: params });
}
