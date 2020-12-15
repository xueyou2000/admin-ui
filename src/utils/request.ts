/**
 * request 网络请求工具
 * 详细文档 @see https://github.com/umijs/umi-request
 */
import { message, Modal, notification } from 'antd';
import { history, getIntl, getLocale } from 'umi';
import { extend, ResponseError } from 'umi-request';
import { cleanAuthority, getAuthority } from './authority';

// 防止一秒内好几个请求，但此时登陆失效，全都401， 弹出多次Modal问题
let stopAuthprityError = false;

export enum ErrorShowType {
  SILENT = 0,
  WARN_MESSAGE = 1,
  ERROR_MESSAGE = 2,
  NOTIFICATION = 4,
  REDIRECT = 9,
}

/**
 * 响应异常处理
 */
function errorHandler(error: ResponseError<IResponse>) {
  const intl = getIntl(getLocale());
  const { response, request } = error;
  if (request.options?.showType === ErrorShowType.SILENT || type === 'skip') {
    throw error;
  }

  if (response && response.status) {
    if (response.status === 401) {
      const authority = getAuthority();
      if (authority !== null) {
        if (!stopAuthprityError) {
          stopAuthprityError = true;
          cleanAuthority();
          Modal.error({
            title: intl.formatMessage({
              id: 'request.unauthorized.error.title',
              description: '授权失败',
            }),
            content: intl.formatMessage({
              id: 'request.unauthorized.error.outtime',
              description: '登陆超时，请重新登陆。',
            }),
            onOk: () => {
              stopAuthprityError = false;
              history.replace('/user/login?status=authorized_timeout', { username: authority.username });
              return Promise.resolve();
            },
          });
        }
      } else {
        history.replace('/user/login?status=unauthorized');
      }
    } else {
      message.error(
        intl.formatMessage({
          id: 'request.unkown.error',
          defaultMessage: '未知异常',
        }),
      );
    }
  } else if (!response) {
    notification.error({
      message: intl.formatMessage({
        id: 'request.network.error.title',
        description: '网络异常',
      }),
      description: intl.formatMessage({
        id: 'request.network.error.mes',
        description: '您的网络发生异常，无法连接服务器',
      }),
    });
  }

  throw error;
}

/**
 * 配置request请求时的默认参数
 */
const request = extend({
  errorHandler, // 默认错误处理
  showType: ErrorShowType.ERROR_MESSAGE, // 错误弹出方式
  timeout: 12000, // 超时时间
  getResponse: false, // 响应结构增加 response 参数
  credentials: 'include', // 默认请求是否带上cookie
});

/**
 * 请求附加授权token拦截器
 */
request.interceptors.request.use((url, options) => {
  const authority = getAuthority();
  if (authority) {
    options.headers = Object.assign({}, options.headers, { token: authority.token });
  }
  return {
    url,
    options,
  };
});

/**
 * 业务状态判断响应拦截器
 */
request.interceptors.response.use(async (response, options) => {
  const intl = getIntl(getLocale());
  const contentType = response.headers.get('Content-Type') || '';
  if (contentType.indexOf('json') !== -1) {
    const data: IResponse = await response.clone().json();

    if (response.status < 200 || response.status >= 300) {
      return response;
    } else {
      // 与后台约定, status !== 0 就算响应失败
      const errMsg =
        data.message ||
        intl.formatMessage({
          id: 'request.system.error',
          defaultMessage: '系统异常',
        });
      if ('status' in data && data.status !== 0) {
        switch (options.showType) {
          case ErrorShowType.SILENT:
            // do nothing
            break;
          case ErrorShowType.WARN_MESSAGE:
            message.warn(errMsg);
            break;
          case ErrorShowType.ERROR_MESSAGE:
            message.error(errMsg);
            break;
          case ErrorShowType.NOTIFICATION:
            notification.open({
              message: errMsg,
            });
            break;
          default:
            message.error(errMsg);
            break;
        }

        const err = new Error(errMsg) as ResponseError;
        err.type = 'skip';
        err.request = { options: options } as any;
        err.response = response;
        throw err;
      }
    }
  }
  return response;
});

export default request;
