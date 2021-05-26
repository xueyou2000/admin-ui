/**
 * 字典类型
 */
interface DictType {
  /** 字典主键 */
  dictId: number;
  /** 字典名称 */
  dictName: string;
  /** 字典类型 */
  dictType: string;
  /** 状态 */
  status: 'TRUE' | 'FALSE';
  /** 备注 */
  remark: string;
  /** 创建时间 */
  createTime: string;
}

type DictMaps = { [key: string]: DictData[] };

interface DictTypeQuery extends QueryBase {
  dictType?: DictType;
}

/**
 * 字典数据
 */
interface DictData {
  /** 字典主键 */
  dictCode: number;
  /** 字典排序 */
  dictSort: number;
  /** 字典标签 */
  dictLabel: string;
  /** 字典键值 */
  dictValue: string;
  /** 字典类型 */
  dictType: string;
  /** 样式属性 */
  cssClass: string;
  /** 是否默认 */
  isDefault: 'TRUE' | 'FALSE';
  /** 状态 */
  status: 'TRUE' | 'FALSE';
  /** 备注 */
  remark: string;
  /** 创建时间 */
  createTime: string;
  /** 字典国际化标签 */
  langLabel: string;
}

interface DictDataQuery extends QueryBase {
  dictData?: DictData;
}
