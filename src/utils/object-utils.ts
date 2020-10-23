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
export function toQueryBaseDto(tableQuery: TableQueryBase): QueryBaseDto {
  const result: QueryBaseDto = {
    dateRanges: [],
    numberRanges: [],
    fuzzyMatches: [],
    multiValues: [],
  };
  const { dateRanges, numberRanges, fuzzyMatches, multiValues } = tableQuery || {};

  if (dateRanges) {
    for (let name in dateRanges) {
      const val = dateRanges[name];
      result.dateRanges?.push({ columnsField: name, startDate: val[0], endDate: val[1] });
    }
  }

  if (numberRanges) {
    for (let name in numberRanges) {
      const val = numberRanges[name];
      result.numberRanges?.push({ columnsField: name, min: val.min, max: val.max });
    }
  }

  if (fuzzyMatches) {
    for (let name in fuzzyMatches) {
      result.fuzzyMatches?.push({ columnsField: name, value: fuzzyMatches[name] });
    }
  }

  if (multiValues) {
    for (let name in multiValues) {
      result.multiValues?.push({ columnsField: name, value: multiValues[name] });
    }
  }

  return result;
}
