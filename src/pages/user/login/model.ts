import { backRedirect } from '@/utils/url-utils';
import { message } from 'antd';
import { Effect, Reducer } from 'umi';
import { loginByCaptcha, loginByMobile } from './service';

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
  };
  reducers: {
    changeLoginStatus: Reducer<StateType, { type: 'changeLoginStatus'; payload: StateType }>;
  };
}

const Model: ModelType = {
  namespace: 'userlogin',
  state: {},
  effects: {
    *loginByCaptcha({ payload }, { call, put }) {
      const response: IResponse<LoginRes> = yield call(loginByCaptcha, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: {
          status: response.status === 0 ? 'ok' : 'error',
          errMsg: response.message,
        },
      });

      if (response.status === 0) {
        message.success('登录成功！');
        backRedirect();
      }
    },
    *loginByMobile({ payload }, { call, put }) {
      const response: IResponse<LoginRes> = yield call(loginByMobile, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: {
          status: response.status === 0 ? 'ok' : 'error',
          errMsg: response.message,
        },
      });

      if (response.status === 0) {
        message.success('登录成功！');
        backRedirect();
      }
    },
  },
  reducers: {
    changeLoginStatus(_state, { payload }) {
      return {
        ...payload,
      };
    },
  },
};

export default Model;
