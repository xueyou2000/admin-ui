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

/**
 * 获取手机短信验证码
 *
 * @param mobile 手机号
 */
export function getMobileCaptcha(mobile: string) {
  return request.post<IResponse>(`/auth/mobile-captch?mobile=${mobile}`);
}

/**
 * 手机验证码登陆
 */
export function loginByMobile(params: MobileLoginParams) {
  return request.post<IResponse<LoginRes>>('/auth/login/mobile', { data: params });
}
