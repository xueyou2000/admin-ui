import React from 'react';
import { KeepAlive } from 'react-activation';

export default function KeepAliveWapper(props: any) {
  const { route, children } = props;

  return <KeepAlive name={route.path}>{children}</KeepAlive>;
}
