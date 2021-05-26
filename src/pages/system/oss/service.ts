import request from '@/utils/request';
import { toQueryBaseDto } from '@/utils/object-utils';

/**
 * 查询文件
 */
export function queryOssByPage(data?: Partial<Oss> & TableQueryParams) {
  const { pageSize, current } = data || {};
  const queryData = toQueryBaseDto<Oss, OssQuery>('oss', data, ['createTime']);

  return request
    .post<IResponse<IPage<Oss>>>(`/system/oss/findByPage/${pageSize}/${current}`, {
      data: queryData,
    })
    .then(res => res.res);
}

/**
 * 删除文件
 */
export function removeOss(ids: number[]) {
  return request.post<IResponse>(`/system/oss/remove`, { params: { ids } });
}

/**
 * 新增文件
 */
export function addOss(oss: Oss) {
  return request.post<IResponse>(`/system/oss/add`, { data: oss });
}

/**
 * 修改文件
 */
export function updateOss(oss: Oss) {
  return request.post<IResponse>(`/system/oss/update`, { data: oss });
}

/**
 * 获取云存储配置
 */
export function getCloudStorageConfig() {
  return request.post<IResponse<CloudStorageConfig>>(`/system/oss/getCloudStorageConfig`).then(res => res.res);
}

/**
 * 更新云存储配置
 */
export function updateCloudStorageConfig(config: CloudStorageConfig) {
  return request
    .post<IResponse<CloudStorageConfig>>(`/system/oss/updateCloudStorageConfig`, { data: config })
    .then(res => res.res);
}
