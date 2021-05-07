import CryptoJS from 'crypto-js';

/**
 * @word 要加密的内容
 * @keyWord String  服务器随机返回的关键字
 *  */
export function aesEncrypt(word: string, keyWord = 'XwKsGlMcdPMEhR1B') {
  var key = CryptoJS.enc.Utf8.parse(keyWord);
  var srcs = CryptoJS.enc.Utf8.parse(word);
  var encrypted = CryptoJS.AES.encrypt(srcs, key, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 });
  return encrypted.toString();
}

/**
 * 获取事件x坐标
 */
export function getStartX(event: any) {
  let x: number;
  if (!event.touches) {
    // 兼容PC端
    x = event.clientX;
  } else {
    // 兼容移动端
    x = event.touches[0].pageX;
  }
  return x;
}

/**
 * 限制在 lower 和 upper 之间的值
 * @param i 被限制的值
 * @param min 下限
 * @param max 上限
 */
export function clamp(i: number, min: number, max: number) {
  if (i < min) {
    return min;
  } else if (i > max) {
    return max;
  } else {
    return i;
  }
}
