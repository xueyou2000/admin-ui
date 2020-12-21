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
}: {
  authority: IPermsType;
  children: React.ReactNode;
  currentUser?: SystemUser;
}) {
  return currentUser?.admin === 'TRUE' ? children : (checkPermissions(authority, PERMS, children, null) as JSX.Element);
}

export default connect(({ user }: { user: UserModelState }) => ({
  currentUser: user.currentUser,
}))(HasPermission);
