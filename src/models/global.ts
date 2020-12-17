import { Reducer, Effect, IRoute } from 'umi';
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
  /** 扁平路由配置 */
  flatRoute: Record<string, IRoute>;
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
    changeFlatRoute: Reducer<GlobalModelState, { type: 'changeFlatRoute'; payload: Record<string, IRoute> }>;
  };
}

const DefaultModel: GlobalModelState = {
  collapsed: false,
  notices: [],
  flatRoute: {},
};

const GlobalModel: GlobalModelType = {
  namespace: 'global',
  state: DefaultModel,
  effects: {
    *fetchNotices(_, { call, put, select }) {
      try {
        const notices = yield call(queryNotices);
        yield put({
          type: 'saveNotices',
          payload: notices,
        });
        const unreadCount: number = yield select(
          (state: { global: GlobalModelState }) => state.global.notices.filter(item => !item.read).length,
        );
        yield put({
          type: 'user/changeNotifyCount',
          payload: {
            totalCount: notices.length,
            unreadCount,
          },
        });
      } catch (error) {
        console.log('获取系统通知异常:', error);
      }
    },
    *clearNotices({ payload }, { put, select }) {
      try {
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
      } catch (error) {
        console.log('清除系统通知异常:', error);
      }
    },
    *changeNoticeReadState({ payload }, { put, select }) {
      try {
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
      } catch (error) {
        console.log('改变系统通知已读状态异常:', error);
      }
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
    changeFlatRoute(state = DefaultModel, { payload }) {
      return {
        ...state,
        flatRoute: payload,
      };
    },
  },
};

export default GlobalModel;
