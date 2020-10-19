interface AuthorithInfo extends LoginRes {
  /** 登陆账户 */
  username: string | null;
  /** 登陆时间 */
  createTime?: Date;
}

const LOCAL_STORAGE_KEY = 'admin-authority';

/**
 * 获取登陆授权信息
 */
export function getAuthority(): AuthorithInfo | null {
  const authorityString = localStorage.getItem(LOCAL_STORAGE_KEY);

  let authority: AuthorithInfo | null = null;
  try {
    if (authorityString) {
      authority = JSON.parse(authorityString);
    }
  } catch (e) {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  }

  return authority;
}

/**
 * 设置授权信息
 *
 * @param authority 登陆授权信息
 */
export function setAuthority(authority: AuthorithInfo) {
  authority.createTime = new Date();
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(authority));
}

/**
 * 清除登陆授权信息
 */
export function cleanAuthority() {
  localStorage.removeItem(LOCAL_STORAGE_KEY);
}
