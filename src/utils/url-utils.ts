import { parse } from 'qs';
import { history } from 'umi';

/**
 * 获取url参数
 */
export function getPageQuery() {
  return parse(window.location.href.split('?')[1]);
}

/**
 * 回到重定向参数指定的地址
 * 当url参数需要有redirect, 则跳转此地址
 */
export function backRedirect() {
  const urlParams = new URL(window.location.href);
  const params = getPageQuery();
  let { redirect } = params as { redirect: string };
  if (redirect) {
    const redirectUrlParams = new URL(redirect);
    if (redirectUrlParams.origin === urlParams.origin) {
      // 如果设置了baseurl， 则可能需要将baseurl也裁剪掉
      redirect = redirect.substr(urlParams.origin.length);
      if (redirect.match(/^\/.*#/)) {
        redirect = redirect.substr(redirect.indexOf('#') + 1);
      }
    } else {
      window.location.href = redirect;
      return;
    }
  }
  history.replace(redirect || '/');
}
