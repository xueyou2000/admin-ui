import React from 'react';
import { connect, UserModelState } from 'umi';
import { checkPermissions, IPermsType } from './CheckPermissions';
import { PERMS } from './perms';

/**
 * 是否有权限
 */
function HasPermission({
  authority,
  children,
  currentUser,
  isAuthority = true,
}: {
  authority: IPermsType;
  isAuthority?: boolean;
  children: React.ReactNode;
  currentUser?: SystemUser;
}): JSX.Element {
  return currentUser?.admin === 'TRUE'
    ? children
    : ((isAuthority ? (checkPermissions(authority, PERMS, children, null) as JSX.Element) : null) as any);
}

export default connect(({ user }: { user: UserModelState }) => ({
  currentUser: user.currentUser,
}))(HasPermission) as typeof HasPermission;
