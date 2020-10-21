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
      const response: SystemUser = yield call(queryCurrentUser);
      setPerms(response.buttons);
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },
    *updateCurrentUser({ payload }, { call, put }) {
      const response: IResponse = yield call(updateCurrentUser, payload);
      if (response.status === 0) {
        const intl = getIntl(getLocale());
        message.success(
          intl.formatMessage({ id: 'settings.basic.update.success', defaultMessage: '更新基本信息成功' }),
        );
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
