import { setDayliEnd, setDayliStart } from './date-utils';

/**
 * 构造树型结构数据
 * @param {*} source 数据源
 * @param {*} id id字段 默认 'id'
 * @param {*} parentId 父节点字段 默认 'parentId'
 * @param {*} children 孩子节点字段 默认 'children'
 * @param {*} rootId 根Id 默认 0
 */
export function treeData<T>(
  source: T[],
  id: string = 'id',
  parentId: string = 'parentId',
  children: string = 'children',
  rootId = 0,
) {
  id = id || 'id';
  parentId = parentId || 'parentId';
  children = children || 'children';
  rootId = rootId || 0;
  const cloneData: T[] = JSON.parse(JSON.stringify(source)); // 对源数据深度克隆
  return cloneData.filter(father => {
    const branchArr = cloneData.filter(child => father[id] === child[parentId]); // 返回每一项的子级数组
    branchArr.length > 0 ? (father[children] = branchArr) : delete father[children]; // 如果存在子级，则给父级添加一个children属性，并赋值
    return father[parentId] === rootId; // 返回第一层
  });
}

/**
 * 转换查询配置
 */
export function toQueryBaseDto<T, Query extends QueryBase>(
  entityName: string,
  tableQuery?: Partial<T> & TableQueryParams,
  dateRange?: string[],
): Query {
  if (!tableQuery) {
    return {} as any;
  }
  const result: QueryBaseDto = {
    dateRanges: [],
    numberRanges: [],
    fuzzyMatches: [],
    multiValues: [],
  };
  const { dateRanges, numberRanges, fuzzyMatches, multiValues, direction, sortNames } = tableQuery || {};

  if (dateRanges) {
    for (let name in dateRanges) {
      const val = dateRanges[name];
      if (val) {
        if (dateRange?.indexOf(name) !== -1) {
          result.dateRanges?.push({
            columnsField: name,
            startDate: setDayliStart(val[0] as any),
            endDate: setDayliEnd(val[1] as any),
          });
        } else {
          result.dateRanges?.push({ columnsField: name, startDate: val[0] as any, endDate: val[1] as any });
        }
      }
    }
    delete tableQuery.dateRanges;
  }

  if (numberRanges) {
    for (let name in numberRanges) {
      const val = numberRanges[name];
      if (val) {
        result.numberRanges?.push({ columnsField: name, min: val.min, max: val.max });
      }
    }
    delete tableQuery.numberRanges;
  }

  if (fuzzyMatches) {
    for (let name in fuzzyMatches) {
      result.fuzzyMatches?.push({ columnsField: name, value: fuzzyMatches[name] });
    }
    delete tableQuery.fuzzyMatches;
  }

  if (multiValues) {
    for (let name in multiValues) {
      result.multiValues?.push({ columnsField: name, value: multiValues[name] });
    }
    delete tableQuery.multiValues;
  }

  if (direction) {
    result.direction = direction;
    delete tableQuery.direction;
  }

  if (sortNames) {
    result.sortNames = sortNames;
    delete tableQuery.sortNames;
  }

  delete tableQuery.current;
  delete tableQuery.pageSize;

  const query: Query = {
    queryBaseDto: result,
  } as Query;
  query[entityName] = tableQuery;

  return query;
}

/**
 * 对象key转数组
 * @param obj
 */
export function objectKeyToArray(obj: any) {
  if (!obj) {
    return [];
  }
  const keys = [];
  for (let key in obj) {
    keys.push(key);
  }
  return keys;
}
