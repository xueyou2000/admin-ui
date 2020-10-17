import request from '@/utils/request';

/**
 * 获取验证码
 */
export function getCaptcha() {
  return request.post<VerifyResponse<CaptchaInfo>>('/captcha/get', { data: { captchaType: 'blockPuzzle' } });
}

/**
 * 校验验证码
 */
export function checkCaptcha(params: CheckCaptchaParams) {
  return request.post<VerifyResponse<{ result: boolean }>>('/captcha/check', { data: params });
}

/**
 * 滑块验证登陆
 */
export function loginByCaptcha(params: LoginParams) {
  return request.post<IResponse<LoginRes>>('/auth/login/captcha', { data: params });
}
