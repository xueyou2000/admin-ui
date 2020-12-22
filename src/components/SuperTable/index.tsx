import ProTable, { ActionType, ProTableProps } from '@ant-design/pro-table';
import { FormInstance } from 'antd/lib/form';
import React, { useEffect, useRef } from 'react';
import { useActivate, useLocation } from 'umi';

export interface PageTableState {
  /** 查询参数 */
  params?: Record<string, object>;
  /** 是否清空现有查询参数 */
  clean?: boolean;
}

/**
 * 超级表格
 * 封装页面传入查询参数
 */
export function SuperTable<T, U extends { [key: string]: any } = {}>(props: ProTableProps<T, U>) {
  const formRef = props.formRef || useRef<FormInstance>();
  const actionRef = props.actionRef || useRef<ActionType>();
  const location = useLocation();

  function queryByParams() {
    const state = (location.state as PageTableState) || {};
    const form = (formRef as any).current as FormInstance;
    const action = (actionRef as any).current as ActionType;
    if (!form || !action) {
      return;
    }

    if ('clean' in state && action.reloadAndRest) {
      action.reloadAndRest();
    }

    if ('params' in state) {
      form.setFieldsValue(state.params);
      action.reload();
    }
  }

  useActivate(() => {
    queryByParams();
  });

  // useEffect(() => {
  //   queryByParams();
  // }, []);

  return <ProTable<T, U> {...props} formRef={formRef} actionRef={actionRef} />;
}
