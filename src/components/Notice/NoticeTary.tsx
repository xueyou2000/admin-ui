import { BellOutlined } from '@ant-design/icons';
import { Badge, Spin, Tabs } from 'antd';
import classNames from 'classnames';
import React from 'react';
import useMergeValue from 'use-merge-value';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';
import NoticeList, { NoticeIconTabProps } from './NoticeList';

export interface NoticeData {
  avatar?: string | React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  datetime?: React.ReactNode;
  extra?: React.ReactNode;
  style?: React.CSSProperties;
  key?: string | number;
  read?: boolean;
}

export interface NoticeTaryProps {
  count?: number;
  bell?: React.ReactNode;
  className?: string;
  loading?: boolean;
  onClear?: (tabName: string, tabKey: string) => void;
  onItemClick?: (item: NoticeData, tabProps: NoticeIconTabProps) => void;
  onViewMore?: (tabProps: NoticeIconTabProps, e: MouseEvent) => void;
  onTabChange?: (tabTile: string) => void;
  style?: React.CSSProperties;
  onPopupVisibleChange?: (visible: boolean) => void;
  popupVisible?: boolean;
  clearText?: string;
  viewMoreText?: string;
  clearClose?: boolean;
  emptyImage?: string;
  children: React.ReactElement<NoticeIconTabProps>[];
}

/**
 * 创建tabs内容
 */
function createTabs(props: NoticeTaryProps) {
  const { children, loading, onClear, onTabChange, onItemClick, onViewMore, clearText, viewMoreText } = props;
  if (!children) {
    return null;
  }
  const panes: React.ReactNode[] = [];
  React.Children.forEach(children, (child: React.ReactElement<NoticeIconTabProps>): void => {
    if (!child) {
      return;
    }
    const { list, title, count, tabKey, showClear, showViewMore } = child.props;
    const len = list && list.length ? list.length : 0;
    const msgCount = count || count === 0 ? count : len;
    const tabTitle: string = msgCount > 0 ? `${title} (${msgCount})` : title;
    panes.push(
      <Tabs.TabPane tab={tabTitle} key={tabKey}>
        <NoticeList
          {...child.props}
          clearText={clearText}
          viewMoreText={viewMoreText}
          data={list}
          onClear={(): void => onClear && onClear(title, tabKey)}
          onClick={(item): void => onItemClick && onItemClick(item, child.props)}
          onViewMore={(event): void => onViewMore && onViewMore(child.props, event)}
          showClear={showClear}
          showViewMore={showViewMore}
          title={title}
        />
      </Tabs.TabPane>,
    );
  });
  return (
    <Spin spinning={loading} delay={300}>
      <Tabs className={styles.tabs} onChange={onTabChange}>
        {panes}
      </Tabs>
    </Spin>
  );
}

/**
 * 通知图标托盘
 */
export default function NoticeTary(props: NoticeTaryProps) {
  const { className, count, bell } = props;
  const notificationBox = createTabs(props);
  const NoticeBellIcon = bell || <BellOutlined className={styles.icon} />;
  const [visible, setVisible] = useMergeValue<boolean>(false, {
    value: props.popupVisible,
    onChange: props.onPopupVisibleChange,
  });
  const trigger = (
    <span className={classNames(classNames(className, styles.noticeButton), { opened: visible })}>
      <Badge count={count} style={{ boxShadow: 'none' }} className={styles.badge}>
        {NoticeBellIcon}
      </Badge>
    </span>
  );

  if (!notificationBox) {
    return trigger;
  }

  return (
    <HeaderDropdown
      placement="bottomRight"
      overlay={notificationBox}
      overlayClassName={styles.popover}
      trigger={['click']}
      visible={visible}
      onVisibleChange={setVisible}
    >
      {trigger}
    </HeaderDropdown>
  );
}
