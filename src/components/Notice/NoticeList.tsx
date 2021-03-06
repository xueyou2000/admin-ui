import { Avatar, List } from 'antd';
import classNames from 'classnames';
import React from 'react';
import styles from './NoticeList.less';
import { NoticeData } from './NoticeTary';

export interface NoticeIconTabProps {
  style?: React.CSSProperties;
  data?: NoticeData[];
  title: string;
  showClear?: boolean;
  showViewMore?: boolean;
  onClick?: (item: NoticeData) => void;
  onClear?: () => void;
  emptyText?: string;
  clearText?: string;
  viewMoreText?: string;
  onViewMore?: (e: any) => void;
  tabKey: string;
  count?: number;
  name?: string;
  list: NoticeData[];
}

/**
 * 通知列表
 */
export default function NoticeList(props: NoticeIconTabProps) {
  const {
    data = [],
    title,
    emptyText,
    showClear = false,
    clearText,
    showViewMore = false,
    viewMoreText,
    onClick,
    onClear,
    onViewMore,
  } = props;

  if (!data || data.length === 0) {
    return (
      <div className={styles.notFound}>
        <img src="https://gw.alipayobjects.com/zos/rmsportal/sAuJeJzSKbUmHfBQRzmZ.svg" alt="not found" />
        <div>{emptyText}</div>
      </div>
    );
  }
  return (
    <div>
      <List<NoticeData>
        className={styles.list}
        dataSource={data}
        renderItem={(item, i) => {
          const itemCls = classNames(styles.item, {
            [styles.read]: item.read,
          });
          // eslint-disable-next-line no-nested-ternary
          const leftIcon = item.avatar ? (
            typeof item.avatar === 'string' ? (
              <Avatar className={styles.avatar} src={item.avatar} />
            ) : (
              <span className={styles.iconElement}>{item.avatar}</span>
            )
          ) : null;

          return (
            <List.Item className={itemCls} key={item.key || i} onClick={() => onClick && onClick(item)}>
              <List.Item.Meta
                className={styles.meta}
                avatar={leftIcon}
                title={
                  <div className={styles.title}>
                    {item.title}
                    <div className={styles.extra}>{item.extra}</div>
                  </div>
                }
                description={
                  <div>
                    <div className={styles.description}>{item.description}</div>
                    <div className={styles.datetime}>{item.datetime}</div>
                  </div>
                }
              />
            </List.Item>
          );
        }}
      />
      <div className={styles.bottomBar}>
        {showClear ? (
          <div onClick={onClear}>
            {clearText} {title}
          </div>
        ) : null}
        {showViewMore ? (
          <div
            onClick={e => {
              if (onViewMore) {
                onViewMore(e);
              }
            }}
          >
            {viewMoreText}
          </div>
        ) : null}
      </div>
    </div>
  );
}
