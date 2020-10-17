interface Size {
  width: string;
  height: string;
}

/**
 * 验证码信息
 * 验证码基于anji-captcha @see https://gitee.com/anji-plus/captcha
 */
interface CaptchaInfo {
  originalImageBase64: string;
  jigsawImageBase64: string;
  token: string;
  secretKey: string;
}

/**
 * 校验验证码参数
 */
interface CheckCaptchaParams {
  /** 验证码类型 */
  captchaType: 'blockPuzzle';
  /** 滑块结果. 需要做aesEncrypt(JSON.stringify({ x: moveLeftDistance, y: 5.0 }), secretKey) 计算得出 */
  pointJson: string;
  /** /captcha/get 接口返回的token */
  token: string;
}
