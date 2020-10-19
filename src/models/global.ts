import { Reducer, Effect } from 'umi';

export interface GlobalModelState {
  /** 菜单栏是否折叠 */
  collapsed: boolean;
}

export interface GlobalModelType {
  namespace: 'global';
  state: GlobalModelState;
  reducers: {
    changeLayoutCollapsed: Reducer<GlobalModelState, { type: 'changeLayoutCollapsed'; payload: boolean }>;
  };
}

const GlobalModel: GlobalModelType = {
  namespace: 'global',
  state: {
    collapsed: false,
  },
  reducers: {
    changeLayoutCollapsed(state, { payload }) {
      return {
        ...state,
        collapsed: payload,
      };
    },
  },
};

export default GlobalModel;
