import { Effect, history, Reducer } from 'umi';

interface VerifyStyle {
  /**
   * 滑块箭头背景色
   */
  moveBlockBackgroundColor: string;
  /**
   * 滑块箭头边框颜色
   */
  leftBarBorderColor: string;
  /**
   * 滑块箭头颜色
   */
  iconColor: string;
  /**
   * 滑块箭头图标
   */
  iconClass: string;
  /**
   * 滑块箭头过度
   */
  transitionLeft: string;
  /**
   * 滑块箭头左边距离
   */
  moveBlockLeft: string;
  /**
   * 滑块条已滑动宽度
   */
  transitionWidth: string;
}

export interface StateType {
  /**
   * 验证码信息
   */
  captcha: CaptchaInfo | null;
  /**
   * 提示文本
   */
  tipWords: string;
  /**
   * 是否验证通过
   */
  passFlag: boolean;
  /**
   * 滑块验证样式
   */
  verifyStyle: VerifyStyle;
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    /** 刷新验证码 */
    refresh: Effect;
  };
  reducers: {
    /** 获取验证码信息 */
    changeCaptcha: Reducer<StateType, { type: string; payload: VerifyResponse<CaptchaInfo> }>;
    /** 改变滑块样式 */
    changeVerifyStyle: Reducer<StateType, { type: string; payload: VerifyStyle }>;
  };
}

const DefaultState: StateType = {
  captcha: null,
  tipWords: '',
  passFlag: false,
  verifyStyle: {
    moveBlockBackgroundColor: '',
    leftBarBorderColor: '#ddd',
    iconColor: '',
    iconClass: 'icon-right',
    transitionLeft: '',
    moveBlockLeft: '',
    transitionWidth: '',
  },
};

function settimeoutWapper(time: number) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}

const Model: ModelType = {
  namespace: 'verify',
  state: DefaultState,
  effects: {
    *refresh({}, { put, call }) {
      yield put({
        type: 'changeVerifyStyle',
        payload: {},
      });
    },
  },
  reducers: {
    changeVerifyStyle(state = DefaultState, { payload }) {
      return {
        ...state,
        verifyStyle: payload,
      };
    },
    changeCaptcha(state = DefaultState, { payload }) {
      if (payload.repCode === '0000') {
        return {
          ...state,
          captcha: payload.repData,
        };
      } else {
        return {
          ...state,
          tipWords: payload.repMsg,
        };
      }
    },
  },
};

export default Model;
