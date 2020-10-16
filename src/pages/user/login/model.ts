import { Effect, history, Reducer } from 'umi';
import { login, LoginRes } from './service';
import { message } from 'antd';
import { parse } from 'qs';

export function getPageQuery() {
  return parse(window.location.href.split('?')[1]);
}

export interface StateType {
  /** 登陆请求响应状态 */
  status?: 'ok' | 'error';
  /** 登陆失败原因 */
  errMsg?: string;
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    login: Effect;
  };
  reducers: {
    changeLoginStatus: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'userlogin',
  state: {},
  effects: {
    *login({ payload }, { call, put }) {
      const response: IResponse<LoginRes> = yield call(login, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: {
          status: response.status === 0 ? 'ok' : 'error',
          errMsg: response.message,
        },
      });

      if (response.status === 0) {
        message.success('登录成功！');
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params as { redirect: string };
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
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
    },
  },
  reducers: {
    changeLoginStatus(state, { payload }) {
      return {
        ...payload,
      };
    },
  },
};

export default Model;
