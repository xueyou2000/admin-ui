import classNames from 'classnames';
import React from 'react';
import './index.less';

export interface ModalContentProps {
  /**
   * 附加类名
   */
  prefixCls?: string;
  /**
   * 根节点的附加类名
   */
  className?: string;
  /**
   * 内联样式
   */
  style?: React.CSSProperties;
  /**
   * 内容
   */
  children?: React.ReactNode;
}

export default function ModalContent(props: ModalContentProps) {
  const { prefixCls = 'modal-content', className, style, children } = props;

  return (
    <div className={classNames(prefixCls, className)} style={style}>
      {children}
    </div>
  );
}
