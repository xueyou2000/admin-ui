/** 应用标题 */
export const app_title = 'XueYou Admin';

/** http请求的基础url */
export const HTTP_BASE_URL = process.env.HTTP_BASE_URL;

export function getRequestUrl(url: string) {
  const finallyUrl = HTTP_BASE_URL ? `${HTTP_BASE_URL.replace(/\/$/, '')}/${url.replace(/^\//, '')}` : url;
  return finallyUrl;
}
