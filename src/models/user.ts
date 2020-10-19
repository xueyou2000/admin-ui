import { setPerms } from '@/components/Authorized/perms';
import { queryCurrentUser } from '@/services/UserService';
import { Effect, Reducer } from 'umi';

export interface UserModelState {
  currentUser: SystemUser | null;
}

export interface UserModelType {
  namespace: 'user';
  state: UserModelState;
  effects: {
    fetchCurrent: Effect;
  };
  reducers: {
    saveCurrentUser: Reducer<UserModelState, { type: 'saveCurrentUser'; payload: SystemUser }>;
  };
}

const UserModel: UserModelType = {
  namespace: 'user',
  state: {
    currentUser: null,
  },
  effects: {
    *fetchCurrent(_, { call, put }) {
      const response: SystemUser = yield call(queryCurrentUser);
      setPerms(response.buttons);
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },
  },
  reducers: {
    saveCurrentUser(_, { payload }) {
      return { currentUser: payload };
    },
  },
};

export default UserModel;
