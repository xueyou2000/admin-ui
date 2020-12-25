import request from '@/utils/request';
import { toQueryBaseDto } from '@/utils/object-utils';

/**
 * 查询系统配置
 */
export function queryConfigByPage(data?: Partial<Config> & TableQueryParams) {
  const { pageSize, current } = data || {};
  const queryData = toQueryBaseDto<Config, ConfigQuery>('config', data);

  return request
    .post<IResponse<IPage<Config>>>(`/system/config/findByPage/${pageSize}/${current}`, {
      data: queryData,
    })
    .then(res => res.res);
}

/**
 * 删除系统配置
 */
export function removeConfig(ids: number[]) {
  return request.post<IResponse>(`/system/config/remove`, { params: { ids } });
}

/**
 * 新增系统配置
 */
export function addConfig(config: Config) {
  return request.post<IResponse>(`/system/config/add`, { data: config });
}

/**
 * 修改系统配置
 */
export function updateConfig(config: Config) {
  return request.post<IResponse>(`/system/config/update`, { data: config });
}
