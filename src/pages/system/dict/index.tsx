import HasPermission from '@/components/Authorized/HasPermission';
import modalPopup from '@/components/ModalPopup';
import { SuperTable } from '@/components/SuperTable';
import { autoQuery } from '@/utils/page-utils';
import { PlusOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import { ActionType, ProColumns } from '@ant-design/pro-table';
import { Button, Divider, message, Modal, Space } from 'antd';
import React, { useRef } from 'react';
import AddDictTypeModal from './AddDictTypeModal';
import UpdateDictTypeModal from './UpdateDictTypeModal';
import DictDataModal from './modules/DIctDataModal';
import { queryDictTypeByPage, removeDictType } from './service';

export default function DictTypeQuery() {
  const actionRef = useRef<ActionType>();
  const [modal, contextHolder] = Modal.useModal();

  function handleAdd() {
    modalPopup(<AddDictTypeModal />, { title: '新增字典类型' }, autoQuery(actionRef));
  }

  function handleUpdate(record: DictType) {
    modalPopup(<UpdateDictTypeModal dictType={record} />, { title: '修改字典类型' }, autoQuery(actionRef));
  }

  function handleList(record: DictType) {
    modal.info({
      icon: null,
      width: 1100,
      title: '字典数据',
      maskClosable: true,
      className: 'modal-popup-holder',
      content: <DictDataModal dictType={record} />,
    });
  }

  function handleRemove(ids: number[]) {
    Modal.confirm({
      title: '是否删除字典类型?',
      onOk: () =>
        removeDictType(ids).then(() => {
          message.success('删除字典类型成功!');
          if (actionRef.current?.clearSelected) {
            actionRef.current?.clearSelected();
          }
          actionRef.current?.reload();
        }),
    });
  }

  const columns: ProColumns<DictType>[] = [
    {
      title: '字典主键',
      dataIndex: 'dictId',
      search: false,
    },
    {
      title: '字典名称',
      dataIndex: ['fuzzyMatches', 'dictName'],
      renderText: (_: string, record) => {
        return record.dictName;
      },
    },
    {
      title: '字典类型',
      dataIndex: ['fuzzyMatches', 'dictType'],
      renderText: (_: string, record) => {
        return record.dictType;
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueEnum: {
        all: { text: '全部', status: '' },
        TRUE: { text: '正常', status: 'Success' },
        FALSE: { text: '禁用', status: 'Error' },
      },
    },
    {
      title: '备注',
      dataIndex: 'remark',
      search: false,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      search: false,
    },
    {
      title: '操作',
      width: '150px',
      dataIndex: 'action',
      search: false,
      render: (_, record) => (
        <>
          <HasPermission authority="system:dict:update">
            <a onClick={() => handleUpdate(record)}>编辑</a>
            <Divider type="vertical" />
          </HasPermission>
          <a onClick={() => handleList(record)}>
            <UnorderedListOutlined />
            列表
          </a>
          <HasPermission authority="system:dict:remove">
            <Divider type="vertical" />
            <a onClick={() => handleRemove([record.dictId])}>删除</a>
          </HasPermission>
        </>
      ),
    },
  ];

  return (
    <PageContainer>
      <SuperTable<DictType>
        headerTitle="字典管理"
        rowKey="dictId"
        columns={columns}
        pagination={{ pageSize: 10 }}
        actionRef={actionRef}
        search={{ labelWidth: 120 }}
        request={params =>
          queryDictTypeByPage({ ...params }).then(page => {
            return { success: true, data: page.records, total: page.total };
          })
        }
        toolBarRender={() => [
          <HasPermission key="add" authority="system:dict:add">
            <Button type="primary" onClick={handleAdd}>
              <PlusOutlined /> 新建
            </Button>
          </HasPermission>,
        ]}
        rowSelection={{}}
        tableAlertRender={({ selectedRowKeys, onCleanSelected }) => (
          <Space size={24}>
            <span>
              已选 {selectedRowKeys.length} 项
              <a style={{ marginLeft: 8 }} onClick={onCleanSelected}>
                取消选择
              </a>
            </span>
          </Space>
        )}
        tableAlertOptionRender={({ selectedRows }) => {
          return (
            <HasPermission authority="system:dict:remove">
              <Space size={16}>
                <a onClick={() => handleRemove(selectedRows.map(x => x.dictId))}>批量删除</a>
              </Space>
            </HasPermission>
          );
        }}
      ></SuperTable>
      {contextHolder}
    </PageContainer>
  );
}
