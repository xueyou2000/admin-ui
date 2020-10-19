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

/**
 * 滑块验证登陆参数
 */
interface LoginParams {
  /** 登陆账号 */
  username: string;
  /** 登陆密码 */
  password: string;
  /** 滑块验证码校验参数 */
  captchaVO?: {
    /** 验证token aesEncrypt(token + '---' + JSON.stringify({ x: moveLeftDistance, y: 5.0 }), secretKey) */
    captchaVerification: string;
  };
}

/**
 * 手机号登陆参数
 */
interface MobileLoginParams {
  /** 登陆手机号 */
  mobile: string;
  /** 验证码 */
  captcha: string;
}

/**
 * 登陆响应
 */
interface LoginRes {
  /** 授权token */
  token: string;
  /** token过期时间(秒) */
  expire: number;
  /** 用户id */
  userId: number;
}
