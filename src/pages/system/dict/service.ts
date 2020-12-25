import { toQueryBaseDto } from '@/utils/object-utils';
import request from '@/utils/request';

/**
 * 分页查询字典类型
 */
export function queryDictTypeByPage(data?: Partial<DictType> & TableQueryParams) {
  return request
    .post<IResponse<IPage<DictType>>>(`/system/dict/type/findByPage/${data?.pageSize}/${data?.current}`, {
      data: toQueryBaseDto<DictType, DictTypeQuery>('dictType', data),
    })
    .then(res => res.res);
}

/**
 * 新增字典类型
 */
export function addDictType(data: DictType) {
  return request.post<IResponse>(`/system/dict/type/add`, { data });
}

/**
 * 修改字典类型
 */
export function updateDictType(data: DictType) {
  return request.post<IResponse>(`/system/dict/type/update`, { data });
}

/**
 * 删除字典类型
 */
export function removeDictType(ids: number[]) {
  return request.post<IResponse>(`/system/dict/type/remove`, { params: { ids } });
}

/**
 * 分页查询字典数据
 */
export function queryDictDataByPage(data?: Partial<DictData> & TableQueryParams) {
  return request
    .post<IResponse<IPage<DictData>>>(`/system/dict/data/findByPage/${data?.pageSize}/${data?.current}`, {
      data: toQueryBaseDto<DictData, DictDataQuery>('dictData', data),
    })
    .then(res => res.res);
}

/**
 * 查询字典数据根据字典类型
 */
export function queryDictDataByType(dictType: string) {
  return request
    .post<IResponse<DictData[]>>(`/system/dict/data/type`, { params: { dictType } })
    .then(res => res.res);
}

/**
 * 查询字典标签
 */
export function getDictLabel(dictType: string, dictValue: string) {
  return request
    .post<IResponse<string>>(`/system/dict/data/label`, { params: { dictType, dictValue } })
    .then(res => res.res);
}

/**
 * 新增字典数据
 */
export function addDictData(data: DictType) {
  return request.post<IResponse>(`/system/dict/data/add`, { data });
}

/**
 * 修改字典数据
 */
export function updateDictData(data: DictType) {
  return request.post<IResponse>(`/system/dict/data/update`, { data });
}

/**
 * 删除字典数据
 */
export function removeDictData(ids: number[]) {
  return request.post<IResponse>(`/system/dict/data/remove`, { params: { ids } });
}

/**
 * 获取字典数据
 */
export function findDictDataByTypes(types: string[]) {
  return request
    .post<IResponse>(`/system/dict/data/findByTypes`, { params: { types } })
    .then(res => res.res);
}
