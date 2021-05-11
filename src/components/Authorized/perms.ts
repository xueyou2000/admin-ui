/** 当前权限 */
let PERMS: string[] = [];

function setPerms(perms: string[]) {
  PERMS = perms || [];
}

function hasPerms(perms: string) {
  if (Array.isArray(PERMS)) {
    return PERMS.some(item => perms === item);
  } else {
    return perms === PERMS;
  }
}

export { PERMS, setPerms, hasPerms };
