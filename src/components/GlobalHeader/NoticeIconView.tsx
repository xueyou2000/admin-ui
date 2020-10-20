import { message, Tag } from 'antd';
import groupBy from 'lodash/groupBy';
import moment from 'moment';
import React, { useEffect } from 'react';
import { connect, ConnectProps, GlobalModelState, NoticeItem, UserModelState } from 'umi';
import NoticeList from '../Notice/NoticeList';
import NoticeTary from '../Notice/NoticeTary';
import styles from './index.less';

export interface GlobalHeaderRightProps extends Partial<ConnectProps> {
  notices?: NoticeItem[];
  userState?: UserModelState;
  fetchingNotices?: boolean;
  onNoticeVisibleChange?: (visible: boolean) => void;
  onNoticeClear?: (tabName?: string) => void;
}

function getNoticeData(notices: NoticeItem[] = []): { [key: string]: NoticeItem[] } {
  if (!notices || notices.length === 0 || !Array.isArray(notices)) {
    return {};
  }

  const newNotices = notices.map(notice => {
    const newNotice = { ...notice };
    if (newNotice.datetime) {
      newNotice.datetime = moment(notice.datetime as string).fromNow();
    }
    if (newNotice.id) {
      newNotice.key = newNotice.id;
    }
    if (newNotice.extra && newNotice.status) {
      const color = { todo: '', processing: 'blue', urgent: 'red', doing: 'gold' }[newNotice.status];
      newNotice.extra = (
        <Tag color={color} style={{ marginRight: 0 }}>
          {newNotice.extra}
        </Tag>
      );
    }
    return newNotice;
  });

  return groupBy(newNotices, 'type');
}

function getUnreadData(noticeData: { [key: string]: NoticeItem[] }) {
  const unreadMsg: { [key: string]: number } = {};
  Object.keys(noticeData).forEach(key => {
    const value = noticeData[key];

    if (!unreadMsg[key]) {
      unreadMsg[key] = 0;
    }

    if (Array.isArray(value)) {
      unreadMsg[key] = value.filter(item => !item.read).length;
    }
  });
  return unreadMsg;
}

function GlobalHeaderRight(props: GlobalHeaderRightProps) {
  const { notices, dispatch, userState, fetchingNotices, onNoticeVisibleChange } = props;
  const noticeData = getNoticeData(notices);
  const unreadMsg = getUnreadData(noticeData);

  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: 'global/fetchNotices',
      });
    }
  }, []);

  function changeReadState(clickedItem: NoticeItem) {
    if (dispatch) {
      dispatch({
        type: 'global/changeNoticeReadState',
        payload: clickedItem.id,
      });
    }
  }

  function handleNoticeClear(title: string, key: string) {
    message.success(`${'清空了'} ${title}`);
    if (dispatch) {
      dispatch({
        type: 'global/clearNotices',
        payload: key,
      });
    }
  }

  return (
    <NoticeTary
      className={styles.action}
      count={userState && userState.unreadCount}
      onItemClick={item => {
        changeReadState(item as NoticeItem);
      }}
      loading={fetchingNotices}
      clearText="清空"
      viewMoreText="查看更多"
      onClear={handleNoticeClear}
      onPopupVisibleChange={onNoticeVisibleChange}
      onViewMore={() => message.info('Click on view more')}
      clearClose={true}
    >
      <NoticeList
        tabKey="notification"
        count={unreadMsg.notification}
        list={noticeData.notification}
        title="通知"
        emptyText="你已查看所有通知"
        showViewMore
        showClear
      />
      <NoticeList
        tabKey="message"
        count={unreadMsg.message}
        list={noticeData.message}
        title="消息"
        emptyText="您已读完所有消息"
        showViewMore
        showClear
      />
      <NoticeList
        tabKey="event"
        title="待办"
        emptyText="你已完成所有待办"
        count={unreadMsg.event}
        list={noticeData.event}
        showViewMore
        showClear
      />
    </NoticeTary>
  );
}

export default connect(
  ({ user, global, loading }: { user: UserModelState; global: GlobalModelState; loading: EffectLoaing }) => ({
    userState: user,
    fetchingNotices: loading.effects['global/fetchNotices'],
    notices: global.notices,
  }),
)(GlobalHeaderRight);
