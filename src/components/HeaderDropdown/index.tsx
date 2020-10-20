import { Dropdown } from 'antd';
import { DropDownProps } from 'antd/es/dropdown';
import classNames from 'classnames';
import React from 'react';
import styles from './index.less';

declare type OverlayFunc = () => React.ReactNode;

export interface HeaderDropdownProps extends Omit<DropDownProps, 'overlay'> {
  overlayClassName?: string;
  overlay: React.ReactNode | OverlayFunc | any;
  placement?: 'bottomLeft' | 'bottomRight' | 'topLeft' | 'topCenter' | 'topRight' | 'bottomCenter';
}

export default function HeaderDropdown(props: React.PropsWithChildren<HeaderDropdownProps>) {
  const { overlayClassName: cls, ...restProps } = props;
  return <Dropdown overlayClassName={classNames(styles.container, cls)} {...restProps} />;
}
