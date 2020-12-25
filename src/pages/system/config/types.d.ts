/**
 * 系统配置
 */
interface Config {
  /** 参数ID */
  configId: number;
  /** 参数名称 */
  configName: string;
  /** 参数键名 */
  configKey: string;
  /** 参数键值 */
  configValue: string;
  /** 是否系统内置 */
  configType: 'TRUE' | 'FALSE';
  /** 备注 */
  remark: string;
  /** 创建者 */
  createBy: string;
  /** 创建时间 */
  createTime: string;
  /** 更新者 */
  updateBy: string;
  /** 更新时间 */
  updateTime: string;
}

interface ConfigQuery extends QueryBase {
  config: Config;
}
