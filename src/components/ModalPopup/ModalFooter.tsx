import classNames from 'classnames';
import React from 'react';
import { ModalPopupContext } from '.';
import './index.less';

export interface ModalFooterProps {
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
   * Model页脚按钮
   */
  children?: React.ReactNode;
}

export default function ModalFooter({ prefixCls = 'ant-modal-footer', className, style, children }: ModalFooterProps) {
  const modelContext = React.useContext(ModalPopupContext);

  function handleClose() {
    modelContext.destroy();
  }

  return (
    <div className={classNames(prefixCls, className)} style={style}>
      {React.Children.map(children, (btn: any, i) => {
        if (btn.props.onClick || btn.props.htmlType === 'submit') {
          return btn;
        } else {
          return React.cloneElement(btn, { key: i, onClick: handleClose });
        }
      })}
    </div>
  );
}
