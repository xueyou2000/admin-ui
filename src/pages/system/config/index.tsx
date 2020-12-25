import HasPermission from '@/components/Authorized/HasPermission';
import modalPopup from '@/components/ModalPopup';
import { SuperTable } from '@/components/SuperTable';
import { autoQuery } from '@/utils/page-utils';
import { PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import { ActionType, ProColumns } from '@ant-design/pro-table';
import { Button, Divider, message, Modal } from 'antd';
import React, { useRef } from 'react';
import AddConfigModal from './AddConfigModal';
import { queryConfigByPage, removeConfig } from './service';
import UpdateConfigModal from './UpdateConfigModal';

export default function SystemConfigQuery() {
  const actionRef = useRef<ActionType>();

  function handleAdd() {
    modalPopup(<AddConfigModal />, { title: '新增系统配置' }, autoQuery(actionRef));
  }

  function handleUpdate(record: Config) {
    modalPopup(<UpdateConfigModal config={record} />, { title: '修改系统配置' }, autoQuery(actionRef));
  }

  function handleRemove(ids: number[]) {
    Modal.confirm({
      title: '是否删除所选配置?',
      onOk: () =>
        removeConfig(ids).then(() => {
          message.success('删除成功!');
          if (actionRef.current?.clearSelected) {
            actionRef.current?.clearSelected();
          }
          actionRef.current?.reload();
        }),
    });
  }

  const columns: ProColumns<Config>[] = [
    {
      title: '参数ID',
      dataIndex: 'configId',
      search: false,
    },
    {
      title: '参数名称',
      dataIndex: 'configName',
    },
    {
      title: '参数键名',
      dataIndex: 'configKey',
    },
    {
      title: '参数键值',
      dataIndex: 'configValue',
      copyable: true,
      ellipsis: true,
      search: false,
    },
    {
      title: '系统内置',
      dataIndex: 'configType',
      valueEnum: {
        TRUE: '是',
        FALSE: '否',
      },
    },
    {
      title: '备注',
      dataIndex: 'remark',
      search: false,
    },
    {
      title: '操作',
      width: '180px',
      dataIndex: 'action',
      search: false,
      render: (_, record) => (
        <>
          <HasPermission authority="system:config:update">
            <a onClick={() => handleUpdate(record)}>编辑</a>
            <Divider type="vertical" />
          </HasPermission>

          <HasPermission authority="system:config:remove">
            <a onClick={() => handleRemove([record.configId])}>删除</a>
          </HasPermission>
        </>
      ),
    },
  ];

  return (
    <PageContainer>
      <SuperTable<Config>
        headerTitle="系统配置"
        rowKey="configId"
        columns={columns}
        pagination={{ pageSize: 10 }}
        actionRef={actionRef}
        search={{ labelWidth: 120 }}
        request={params =>
          queryConfigByPage({ ...params }).then(page => {
            return { success: true, data: page.records, total: page.total };
          })
        }
        toolBarRender={() => [
          <HasPermission key="add" authority="system:config:add">
            <Button type="primary" onClick={handleAdd}>
              <PlusOutlined /> 新建
            </Button>
          </HasPermission>,
        ]}
      ></SuperTable>
    </PageContainer>
  );
}
