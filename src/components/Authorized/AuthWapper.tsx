import { getAuthority } from '@/utils/authority';
import React, { PropsWithChildren } from 'react';
import { connect, ConnectProps, Redirect } from 'umi';

function AuthWapper(props: PropsWithChildren<ConnectProps>) {
  const authority = getAuthority();

  if (authority && authority.token) {
    return props.children;
  } else {
    return <Redirect to={`/user/login?redirect=${location.pathname}`} />;
  }
}

export default connect()(AuthWapper);
