import { Reducer, Effect } from 'umi';
import { NoticeData } from '@/components/Notice/NoticeTary';
import { queryNotices } from '@/services/UserService';

export interface NoticeItem extends NoticeData {
  id: string;
  type: string;
  status: string;
}

export interface GlobalModelState {
  /** 菜单栏是否折叠 */
  collapsed: boolean;
  /** 系统通知 */
  notices: NoticeItem[];
}

export interface GlobalModelType {
  namespace: 'global';
  state: GlobalModelState;
  effects: {
    fetchNotices: Effect;
    clearNotices: Effect;
    changeNoticeReadState: Effect;
  };
  reducers: {
    changeLayoutCollapsed: Reducer<GlobalModelState, { type: 'changeLayoutCollapsed'; payload: boolean }>;
    saveNotices: Reducer<GlobalModelState>;
    saveClearedNotices: Reducer<GlobalModelState>;
  };
}

const DefaultModel: GlobalModelState = {
  collapsed: false,
  notices: [],
};

const GlobalModel: GlobalModelType = {
  namespace: 'global',
  state: DefaultModel,
  effects: {
    *fetchNotices(_, { call, put, select }) {
      const data = yield call(queryNotices);
      yield put({
        type: 'saveNotices',
        payload: data,
      });
      const unreadCount: number = yield select(
        (state: { global: GlobalModelState }) => state.global.notices.filter(item => !item.read).length,
      );
      yield put({
        type: 'user/changeNotifyCount',
        payload: {
          totalCount: data.length,
          unreadCount,
        },
      });
    },
    *clearNotices({ payload }, { put, select }) {
      yield put({
        type: 'saveClearedNotices',
        payload,
      });
      const count: number = yield select((state: { global: GlobalModelState }) => state.global.notices.length);
      const unreadCount: number = yield select(
        (state: { global: GlobalModelState }) => state.global.notices.filter(item => !item.read).length,
      );
      yield put({
        type: 'user/changeNotifyCount',
        payload: {
          totalCount: count,
          unreadCount,
        },
      });
    },
    *changeNoticeReadState({ payload }, { put, select }) {
      const notices: NoticeItem[] = yield select((state: { global: GlobalModelState }) =>
        state.global.notices.map(item => {
          const notice = { ...item };
          if (notice.id === payload) {
            notice.read = true;
          }
          return notice;
        }),
      );

      yield put({
        type: 'saveNotices',
        payload: notices,
      });

      yield put({
        type: 'user/changeNotifyCount',
        payload: {
          totalCount: notices.length,
          unreadCount: notices.filter(item => !item.read).length,
        },
      });
    },
  },
  reducers: {
    changeLayoutCollapsed(state = DefaultModel, { payload }) {
      return {
        ...state,
        collapsed: payload,
      };
    },
    saveNotices(state = DefaultModel, { payload }): GlobalModelState {
      return {
        ...state,
        notices: payload,
      };
    },
    saveClearedNotices(state = DefaultModel, { payload }) {
      return {
        ...state,
        notices: state.notices.filter((item): boolean => item.type !== payload),
      };
    },
  },
};

export default GlobalModel;
