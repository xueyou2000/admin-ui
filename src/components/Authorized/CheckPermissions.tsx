import React from 'react';
import { PERMS } from './perms';

export type IPermsType = undefined | string | string[];

/**
 * 权限检查
 * Common check permissions method
 * @param { 权限判定 | Permission judgment } perms
 * @param { 你的权限 | Your permission description } currentPerms
 * @param { 通过的组件 | Passing components } target
 * @param { 未通过的组件 | no pass components } Exception
 */
function checkPermissions<T, K>(perms: IPermsType, currentPerms: string[], target: T, Exception: K) {
  // 没有判定权限.默认查看所有
  if (!perms) {
    return target;
  }
  // 数组处理
  if (Array.isArray(perms)) {
    if (Array.isArray(currentPerms)) {
      if (currentPerms.some(item => perms.includes(item))) {
        return target;
      }
    } else if (perms.includes(currentPerms)) {
      return target;
    }
    return Exception;
  }

  // string 处理
  if (typeof perms === 'string') {
    if (Array.isArray(currentPerms)) {
      if (currentPerms.some(item => perms === item)) {
        return target;
      }
    } else if (perms === currentPerms) {
      return target;
    }
    return Exception;
  }

  throw new Error('unsupported parameters');
}

function check<T, K>(authority: IPermsType, target: T, Exception: K): T | K | React.ReactNode {
  return checkPermissions<T, K>(authority, PERMS, target, Exception);
}

export { checkPermissions };
export default check;
