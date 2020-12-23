import { ModalPopupContext } from '@/components/ModalPopup';
import { findDictDataByTypes } from '@/pages/system/dict/service';
import { ActionType } from '@ant-design/pro-table';
import React, { useState, useContext, useEffect } from 'react';
import { objectKeyToArray } from './object-utils';

export function autoQuery(actionRef: React.MutableRefObject<ActionType | undefined>) {
  return (refresh: boolean) => {
    if (refresh) {
      actionRef.current?.reload();
    }
  };
}

export function useSubmit<T = any>(submitService: (data: T) => Promise<unknown>) {
  const modelContext = useContext(ModalPopupContext);
  const [loading, setLoading] = useState(false);

  async function submitHandle(data: T) {
    setLoading(true);
    try {
      await submitService(data);
      setLoading(false);
      modelContext.destroy(true);
    } finally {
      setLoading(false);
    }
  }

  return { loading, submitHandle };
}

export function useDicts<T extends { [P in keyof T]: DictData[] }>(map: T): { [P in keyof T]: DictData[] } {
  // 字典
  const [dictMaps, setDictMaps] = useState<T>(map);

  function fetchData() {
    findDictDataByTypes(objectKeyToArray(dictMaps)).then(res => {
      setDictMaps(res);
    });
  }

  useEffect(() => {
    fetchData();
  }, []);

  return dictMaps;
}

export function getDictLabel(value: string | number, dictDatas: DictData[]) {
  const item = dictDatas.find(x => x.dictValue == value);
  return item?.dictLabel || '';
}

export function dictToValueEnum(dictData: DictData[], all: boolean = true) {
  const valueEnum = all ? { all: { text: '全部' } } : {};
  dictData.forEach(d => {
    valueEnum[d.dictValue] = {
      text: d.dictLabel,
      color: d.cssClass,
      disabled: d.status === 'FALSE',
    };
  });
  return valueEnum;
}
