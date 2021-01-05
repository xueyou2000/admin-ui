import { setPerms } from '@/components/Authorized/perms';
import { queryCurrentUser, updateCurrentUser } from '@/services/UserService';
import { message } from 'antd';
import { Effect, getIntl, getLocale, Reducer } from 'umi';

export interface UserModelState {
  currentUser: SystemUser | null;
  notifyCount: number;
  unreadCount: number;
}

export interface UserModelType {
  namespace: 'user';
  state: UserModelState;
  effects: {
    fetchCurrent: Effect;
    updateCurrentUser: Effect;
  };
  reducers: {
    saveCurrentUser: Reducer<UserModelState, { type: 'saveCurrentUser'; payload: SystemUser }>;
    changeNotifyCount: Reducer<UserModelState>;
  };
}

const DefaultModel: UserModelState = {
  currentUser: null,
  notifyCount: 0,
  unreadCount: 0,
};

const UserModel: UserModelType = {
  namespace: 'user',
  state: DefaultModel,
  effects: {
    *fetchCurrent(_, { call, put }) {
      try {
        const userInfo: SystemUser = yield call(queryCurrentUser);
        setPerms(userInfo.buttons);
        yield put({
          type: 'saveCurrentUser',
          payload: userInfo,
        });
      } catch (error) {
        console.log('获取当前登陆用户信息异常:', error);
      }
    },
    *updateCurrentUser({ payload }, { call, select, put }) {
      try {
        const currentUser: SystemUser = yield select((state: { user: UserModelState }) => state.user.currentUser);
        const user = Object.assign({}, currentUser, payload);
        yield call(updateCurrentUser, user);
        yield put({
          type: 'saveCurrentUser',
          payload: user,
        });
        const intl = getIntl(getLocale());
        message.success(
          intl.formatMessage({ id: 'settings.basic.update.success', defaultMessage: '更新基本信息成功' }),
        );
      } catch (error) {
        console.log('更新当前登陆用户信息异常:', error);
      }
    },
  },
  reducers: {
    saveCurrentUser(state = DefaultModel, { payload }) {
      return { ...state, currentUser: payload };
    },
    changeNotifyCount(state = DefaultModel, { payload }) {
      return {
        ...state,
        notifyCount: payload.notifyCount,
        unreadCount: payload.unreadCount,
      };
    },
  },
};

export default UserModel;
