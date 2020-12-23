import ModalContent from '@/components/ModalPopup/ModalContent';
import { getDictLabel } from '@/utils/page-utils';
import { Descriptions, Divider, Input } from 'antd';
import React from 'react';

export default function OperLogDetailModal({ operLog, dictMaps }: { operLog: OperLog; dictMaps: DictMaps }) {
  return (
    <div>
      <ModalContent>
        <Descriptions>
          <Descriptions.Item label="模块">{operLog.title}</Descriptions.Item>
          <Descriptions.Item label="操作类型">
            {getDictLabel(operLog.businessType, dictMaps.sys_oper_type)}
          </Descriptions.Item>
          <Descriptions.Item label="状态">{operLog.status == '0' ? '成功' : '失败'}</Descriptions.Item>
          <Descriptions.Item label="请求地址">{operLog.method}</Descriptions.Item>
        </Descriptions>
        <Divider />
        <Input.TextArea rows={15} value={operLog.operParam} disabled={true} />
      </ModalContent>
    </div>
  );
}
