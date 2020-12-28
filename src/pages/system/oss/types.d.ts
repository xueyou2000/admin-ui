/**
 * 文件
 */
interface Oss {
  /** id */
  id: number;
  /** 文件名 */
  fileName: string;
  /** 文件后缀名 */
  fileSuffix: string;
  /** URL地址 */
  url: string;
  /** 云存储服务商 */
  service: number;
  /** 创建者 */
  createBy: string;
  /** 创建时间 */
  createTime: string;
  /** 更新者 */
  updateBy: string;
  /** 更新时间 */
  updateTime: string;
}

interface OssQuery extends QueryBase {
  oss: Oss;
}

/**
 * 云存储配置
 */
interface CloudStorageConfig {
  /**类型 1：七牛 2：阿里云 3：腾讯云  */
  type: number;
  /** 七牛绑定的域名 */
  qiniuDomain: string;
  /** 七牛路径前缀 */
  qiniuPrefix: string;
  /** 七牛ACCESS_KEY */
  qiniuAccessKey: string;
  /** 七牛SECRET_KEY */
  qiniuSecretKey: string;
  /** 七牛存储空间名 */
  qiniuBucketName: string;
  /** 阿里云绑定的域名 */
  aliyunDomain: string;
  /** 阿里云路径前缀 */
  aliyunPrefix: string;
  /** 阿里云EndPoint */
  aliyunEndPoint: string;
  /** 阿里云AccessKeyId */
  aliyunAccessKeyId: string;
  /** 阿里云AccessKeySecret */
  aliyunAccessKeySecret: string;
  /** 阿里云BucketName */
  aliyunBucketName: string;
  /** 腾讯云绑定的域名 */
  qcloudDomain: string;
  /** 腾讯云路径前缀 */
  qcloudPrefix: string;
  /** 腾讯云SecretId */
  qcloudSecretId: string;
  /** 腾讯云SecretKey */
  qcloudSecretKey: string;
  /** 腾讯云BucketName */
  qcloudBucketName: string;
  /** 腾讯云COS所属地区 */
  qcloudRegion: string;
}
