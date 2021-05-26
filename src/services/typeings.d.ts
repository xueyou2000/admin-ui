/**
 * 通用接口响应
 * 根据后台返回的接口定义， 并配置umi-request的错误适配器
 */
interface IResponse<T = any> {
  /** 状态码 0=响应成功 */
  status: number;
  /** 响应消息, success=响应成功 */
  message: string;
  /** 响应数据 */
  res: T;
  /** 重定向地址 */
  redirect?: string;
}

interface IPage<T = any> {
  /** 分页数据 */
  records: T[];
  /** 总条数 */
  total: number;
  /** 当前页码 */
  current: number;
  /** 查询条数 */
  size: number;
}

/**
 * 查询配置前台结构(ProTable只能这样)
 */
interface TableQueryBase {
  /** 日期范围  例： dateRange.createTime: ["2020-10-08 15:47:40", "2020-11-11 15:47:40"] */
  dateRanges?: { [columnsField: string]: string[] };
  /** 数值范围查询 例: numberRanges.orderNum.min: 1,  orderNum.max: 2,  需要由2个查询条件拼成 */
  numberRanges?: { [columnsField: string]: { min: number; max: number } };
  /** 模糊查询 例: fuzzyMatches.menuName: '系统' */
  fuzzyMatches?: { [columnsField: string]: string };
  /** 多值匹配查询 例: multiValues.status: ['SUCCESS', 'FAIL'] */
  multiValues?: { [columnsField: string]: string[] };
}

interface TableQueryParams extends TableQueryBase, QueryParams {
  /** 排序方式 (DESC=降序, ASC=升序) */
  direction?: 'DESC' | 'ASC';
  /** 排序字段 */
  sortNames?: string[];
}

/**
 * 通用查询配置(后台结构)
 */
interface QueryBaseDto {
  /** 排序方式 (DESC=降序, ASC=升序) */
  direction?: 'DESC' | 'ASC';
  /** 排序字段 */
  sortNames?: string[];
  /** 日期范围查询 */
  dateRanges?: DateRange[];
  /** 数值范围查询 */
  numberRanges?: NumberRange[];
  /** 模糊查询 */
  fuzzyMatches?: FuzzyMatch[];
  /** 多值匹配查询 */
  multiValues?: MultiMatch[];
}

interface QueryBase {
  queryBaseDto?: QueryBaseDto;
}

/** 日期范围查询 */
interface DateRange {
  /** 列名称(字段名) */
  columnsField: string;
  /** 起始日期 */
  startDate: Date;
  /** 结束日期 */
  endDate: Date;
}

/** 数值范围查询 */
interface NumberRange {
  /** 列名称(字段名) */
  columnsField: string;
  /** 最小值 */
  min: number;
  /** 最大值 */
  max: number;
}

/** 模糊查询 */
interface FuzzyMatch {
  /** 列名称(字段名) */
  columnsField: string;
  /** 模糊值 */
  value: string;
}

/** 多值匹配查询 */
interface MultiMatch {
  /** 列名称(字段名) */
  columnsField: string;
  /** 搜索值 */
  value: string[];
}

/**
 * 验证码插件的响应结构
 */
interface VerifyResponse<T = any> {
  /** 是否错误 */
  error: boolean;
  /** 是否成功 */
  success: boolean;
  /** 状态码: '0000'=响应成功 */
  repCode: string;
  /** 响应数据 */
  repData: T;
  /** 错误消息 */
  repMsg: string;
}

/**
 * 用户信息
 */
interface SystemUser {
  /** 用户id */
  userId: string;
  /** 部门id */
  deptId: number;
  /** 用户名称 */
  userName: string;
  /** 用户类型 */
  userType: string;
  /** 邮箱 */
  email: string;
  /** 手机号 */
  phonenumber: string;
  /** 性别 (0=女性，1=男性) */
  sex: string;
  /** 头像 */
  avatar: string;
  /** 最后登陆ip */
  loginIp: string;
  /** 最后登陆时间 */
  loginDate: string;
  /** 备注 */
  remark: string;
  /** 直属部门 */
  dept: SystemDept;
  /** 角色 */
  roles: SystemRole[];
  /** 角色id集合 */
  roleIds: number[];
  /** 权限信息 */
  buttons: string[];
  /** 是否超级管理员 */
  admin: 'TRUE' | 'FALSE';
}

/**
 * 部门信息
 */
interface SystemDept {
  /** 部门id */
  deptId: number;
  /** 父部门id */
  parentId: number;
  /**
   * 祖级列表
   * 按照顺序的部门id字符串, 比如 0,100,102, 0=xx科技,100=深圳总公司,102=研发部门, 顺序按照层级关系递进
   */
  ancestors: string;
  /** 部门名称 */
  deptName: string;
  /** 显示顺序 */
  orderNum: string;
  /** 负责人 */
  leader: string;
  /** 负责人id */
  leaderId: string;
  /** 联系电话 */
  phone: string;
  /** 邮箱 */
  email: string;
  /** 部门状态 (0=正常, 1=停用) */
  status: string;
}

/**
 * 角色信息
 */
interface SystemRole {
  /** 角色id */
  roleId: number;
  /** 角色名称 */
  roleName: string;
  /** 角色权限字符串 */
  roleKey: string;
  /** 角色排序 */
  roleSort: string;
  /** 数据范围（1：所有数据权限；2：自定数据权限） */
  dataScope: string;
  /** 角色状态（0正常 1停用） */
  status: string;
  /** 备注 */
  remark: string;
}

/**
 * 系统菜单
 */
interface SystemMenu {
  /** 菜单id */
  menuId: number;
  /** 菜单名称 */
  menuName: string;
  /** 父菜单名称 */
  parentName: string;
  /** 父菜单名id */
  parentId: number;
  /** 打开方式 (_blank新窗口) */
  target: string;
  /** 显示顺序 */
  orderNum: string;
  /** 类型:0目录,1菜单,2按钮 */
  menuType: string;
  /** 菜单URL */
  menuKey: string;
  /** 组件 */
  component: string;
  /** 菜单状态:0显示,1隐藏 */
  visible: string;
  /** 权限字符串 */
  perms: string;
  /** 菜单图标 */
  icon: string;
  /** 链接地址 */
  path: string;
  /** 重定向地址 */
  redirect: string;
  /** 隐藏子菜单 */
  hiddenChildren: string;
  /** 隐藏 PageHeader 组件中的页面带的 面包屑和页面标题栏 */
  hiddenHeader: string;
  /** 子菜单 */
  children: SystemMenu[];
}
