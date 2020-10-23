export class MenuType {
  public static readonly M: Enum = {
    name: 'M',
    desc: '目录',
  };

  public static readonly F: Enum = {
    name: 'F',
    desc: '按钮',
  };

  public static readonly C: Enum = {
    name: 'C',
    desc: '菜单',
  };
}

export class MenuVisible {
  public static readonly '0': Enum = {
    name: '0',
    desc: '显示',
  };
  public static readonly '1': Enum = {
    name: '1',
    desc: '隐藏',
  };
}
