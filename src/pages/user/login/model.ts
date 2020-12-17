import { cleanAuthority, setAuthority } from '@/utils/authority';
import { backRedirect, getPageQuery } from '@/utils/url-utils';
import { message } from 'antd';
import { Effect, Reducer, history } from 'umi';
import { loginByCaptcha, loginByMobile, logout } from './service';

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
    /** 滑块验证登陆 */
    loginByCaptcha: Effect;
    /** 手机验证码登陆 */
    loginByMobile: Effect;
    /** 注销 */
    logout: Effect;
  };
  reducers: {
    changeLoginStatus: Reducer<StateType, { type: 'changeLoginStatus'; payload: StateType }>;
    resetLoginStatus: Reducer<StateType, { type: 'changeLoginStatus'; payload: StateType }>;
  };
}

const Model: ModelType = {
  namespace: 'userlogin',
  state: {},
  effects: {
    *loginByCaptcha({ payload }, { call, put }) {
      try {
        const result: LoginRes = yield call(loginByCaptcha, payload);
        yield put({
          type: 'changeLoginStatus',
          payload: { status: 'ok' },
        });
        setAuthority({ username: (payload as LoginParams).username, ...result });
        message.success('登录成功！');
        backRedirect();
      } catch (error) {
        console.log('验证码登陆异常:', error);
        yield put({
          type: 'changeLoginStatus',
          payload: {
            status: 'error',
            errMsg: error.message || '登陆失败',
          },
        });
      }
    },
    *loginByMobile({ payload }, { call, put }) {
      try {
        const result: LoginRes = yield call(loginByMobile, payload);
        yield put({
          type: 'changeLoginStatus',
          payload: { status: 'ok' },
        });
        setAuthority({ username: (payload as MobileLoginParams).mobile, ...result });
        message.success('登录成功！');
        backRedirect();
      } catch (error) {
        console.log('手机号登陆异常:', error);
        yield put({
          type: 'changeLoginStatus',
          payload: {
            status: 'error',
            errMsg: error.message || '登陆失败',
          },
        });
      }
    },
    logout(_, { put }) {
      const { redirect } = getPageQuery();
      logout();
      cleanAuthority();

      // Note: There may be security issues, please note
      if (window.location.pathname !== '/user/login' && !redirect) {
        history.replace({
          pathname: '/user/login',
        });
      }

      put({
        type: 'changeLoginStatus',
        payload: {
          status: undefined,
          errMsg: '',
        },
      });
    },
  },
  reducers: {
    changeLoginStatus(_state, { payload }) {
      return {
        ...payload,
      };
    },
    resetLoginStatus() {
      return { status: undefined, errMsg: '' };
    },
  },
};

export default Model;
