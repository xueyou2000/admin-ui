/** 当前权限 */
let PERMS: string[] = [];

function setPerms(perms: string[]) {
  PERMS = perms || [];
}

export { PERMS, setPerms };
