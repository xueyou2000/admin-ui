import { Result } from 'antd';
import React, { PropsWithChildren } from 'react';
import { connect, UserModelState } from 'umi';
import { checkPermissions, IPermsType } from './CheckPermissions';

interface AuthorizedProps {
  authority: IPermsType;
  noMatch?: React.ReactNode;
  currentUser: SystemUser | null;
}

function Authorized(props: PropsWithChildren<AuthorizedProps>) {
  const {
    currentUser,
    children,
    authority,
    noMatch = <Result status="403" title="403" subTitle="Sorry, you are not authorized to access this page." />,
  } = props;

  const childrenRender: React.ReactNode = typeof children === 'undefined' ? null : children;
  const dom =
    currentUser?.admin === 'TRUE'
      ? children
      : checkPermissions(authority, currentUser?.buttons || [], childrenRender, noMatch);
  return <>{dom}</>;
}

export default connect(({ user }: { user: UserModelState }) => ({
  currentUser: user.currentUser,
}))(Authorized);
