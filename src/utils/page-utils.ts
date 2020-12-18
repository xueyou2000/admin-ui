import { ModalPopupContext } from '@/components/ModalPopup';
import { ActionType } from '@ant-design/pro-table';
import React, { useState, useContext } from 'react';

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
