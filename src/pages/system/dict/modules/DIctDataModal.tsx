import HasPermission from '@/components/Authorized/HasPermission';
import modalPopup from '@/components/ModalPopup';
import ModalContent from '@/components/ModalPopup/ModalContent';
import { autoQuery } from '@/utils/page-utils';
import { PlusOutlined } from '@ant-design/icons';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import { Button, Divider, message, Modal, Space } from 'antd';
import React, { useRef } from 'react';
import { queryDictDataByPage, removeDictData } from '../service';
import AddDictDataModal from './AddDictDataModal';
import UpdateDictDataModal from './UpdateDictDataModal';

export default function DictDataModal({ dictType: dict }: { dictType: DictType }) {
  const actionRef = useRef<ActionType>();

  function handleAdd() {
    modalPopup(<AddDictDataModal dictType={dict.dictType} />, { title: '新增字典数据' }, autoQuery(actionRef));
  }

  function handleUpdate(record: DictData) {
    modalPopup(<UpdateDictDataModal dictData={record} />, { title: '修改字典数据' }, autoQuery(actionRef));
  }

  function handleRemove(ids: number[]) {
    Modal.confirm({
      title: '是否删除字典数据?',
      onOk: () =>
        removeDictData(ids).then(() => {
          message.success('删除字典数据成功!');
          if (actionRef.current?.clearSelected) {
            actionRef.current?.clearSelected();
          }
          actionRef.current?.reload();
        }),
    });
  }

  const columns: ProColumns<DictData>[] = [
    {
      title: '字典编码',
      dataIndex: 'dictCode',
    },
    {
      title: '字典标签',
      dataIndex: 'dictLabel',
    },
    {
      title: '字典键值',
      dataIndex: 'dictValue',
    },
    {
      title: '字典排序',
      dataIndex: 'dictSort',
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
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
    },
    {
      title: '操作',
      width: '150px',
      dataIndex: 'action',
      render: (_, record) => (
        <>
          <HasPermission authority="system:dict:update">
            <a onClick={() => handleUpdate(record)}>编辑</a>
            <Divider type="vertical" />
          </HasPermission>
          <HasPermission authority="system:dict:remove">
            <a onClick={() => handleRemove([record.dictCode])}>删除</a>
          </HasPermission>
        </>
      ),
    },
  ];

  return (
    <ModalContent>
      <ProTable<DictData>
        search={false}
        rowKey="dictCode"
        columns={columns}
        pagination={{ pageSize: 10 }}
        actionRef={actionRef}
        request={params =>
          queryDictDataByPage({ ...params, dictType: dict.dictType, direction: 'ASC', sortNames: ['dict_sort'] }).then(
            page => {
              return { success: true, data: page.records, total: page.total };
            },
          )
        }
        rowSelection={{}}
        toolBarRender={() => [
          <HasPermission key="add" authority="system:dict:add">
            <Button type="primary" onClick={handleAdd}>
              <PlusOutlined /> 新建
            </Button>
          </HasPermission>,
        ]}
        tableAlertRender={({ selectedRowKeys, selectedRows, onCleanSelected }) => (
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
                <a onClick={() => handleRemove(selectedRows.map(x => x.dictCode))}>批量删除</a>
              </Space>
            </HasPermission>
          );
        }}
      />
    </ModalContent>
  );
}
