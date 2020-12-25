import HasPermission from '@/components/Authorized/HasPermission';
import modalPopup from '@/components/ModalPopup';
import { SuperTable } from '@/components/SuperTable';
import { dictToValueEnum, useDicts } from '@/utils/page-utils';
import { AlignLeftOutlined, CloseOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import { ActionType, ProColumns } from '@ant-design/pro-table';
import { Button, DatePicker, Form, message, Modal, Space } from 'antd';
import { FormInstance } from 'antd/es/form';
import * as dayjs from 'dayjs';
import React, { useRef } from 'react';
import OperLogDetailModal from './DetailDialog';
import { cleanOperLog, exportOperLog, queryOperLogByPage, removeOperLog } from './service';

export default function OperLogQuery() {
  const formRef = useRef<FormInstance<OperLog>>();
  const actionRef = useRef<ActionType>();
  const dictMaps = useDicts({
    sys_oper_type: [],
  });

  function handleDetail(record: OperLog) {
    modalPopup(<OperLogDetailModal operLog={record} dictMaps={dictMaps} />, { title: '操作详情' });
  }

  function handleRemove(ids: number[]) {
    Modal.confirm({
      title: '是否删除所选日志数据?',
      onOk: () =>
        removeOperLog(ids).then(() => {
          message.success('删除操作日志成功!');
          if (actionRef.current?.clearSelected) {
            actionRef.current?.clearSelected();
          }
          actionRef.current?.reload();
        }),
    });
  }

  function handleClean() {
    Modal.confirm({
      title: '是否清空所有操作日志数据?',
      onOk: () =>
        cleanOperLog().then(() => {
          message.success('清空操作日志成功!');
          if (actionRef.current?.clearSelected) {
            actionRef.current?.clearSelected();
          }
          actionRef.current?.reload();
        }),
    });
  }

  function handleExport() {
    exportOperLog(formRef.current?.getFieldsValue()).then(fileName => {
      window.open(`/file/tmp-download/${fileName}`);
    });
  }

  const columns: ProColumns<OperLog>[] = [
    {
      title: '日志编号',
      dataIndex: 'operId',
      search: false,
    },
    {
      title: '操作模块',
      dataIndex: 'title',
      search: false,
    },
    {
      title: '操作类型',
      dataIndex: 'businessType',
      valueEnum: dictToValueEnum(dictMaps.sys_oper_type),
    },
    {
      title: '操作人员',
      dataIndex: 'operName',
    },
    {
      title: '主机',
      dataIndex: 'operIp',
      search: false,
    },
    {
      title: '操作地点',
      dataIndex: 'operLocation',
      search: false,
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueEnum: {
        '': { text: '全部', status: '' },
        '0': { text: '成功', status: 'Success' },
        '1': { text: '失败', status: 'Error' },
      },
    },
    {
      title: '操作时间',
      dataIndex: 'operTime',
      search: false,
      renderText: (_: string, record) => {
        const operTime = dayjs(record.operTime);
        return dayjs()
          .subtract(2, 'day')
          .isBefore(operTime)
          ? operTime.fromNow()
          : _;
      },
    },
    {
      title: '操作时间',
      dataIndex: ['dateRanges', 'operTime'],
      hideInTable: true,
      renderFormItem: item => {
        return (
          <Form.Item name={item.dataIndex} label="">
            <DatePicker.RangePicker />
          </Form.Item>
        );
      },
    },
    {
      title: '操作',
      width: '150px',
      dataIndex: 'action',
      search: false,
      render: (_, record) => (
        <>
          <a onClick={() => handleDetail(record)}>详情</a>
        </>
      ),
    },
  ];

  return (
    <PageContainer>
      <SuperTable<OperLog>
        headerTitle="操作日志"
        rowKey="operId"
        columns={columns}
        formRef={formRef}
        pagination={{ pageSize: 10 }}
        actionRef={actionRef}
        search={{ labelWidth: 120 }}
        request={params =>
          queryOperLogByPage({ ...params }).then(page => {
            return { success: true, data: page.records, total: page.total };
          })
        }
        toolBarRender={() => [
          <HasPermission key="add" authority="monitor:operlog:remove">
            <Button type="ghost" danger onClick={handleClean}>
              <CloseOutlined /> 清空
            </Button>
          </HasPermission>,
          <HasPermission key="add" authority="monitor:operlog:export">
            <Button type="default" onClick={handleExport}>
              <AlignLeftOutlined /> 导出
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
            <HasPermission authority="monitor:operlog:remove">
              <Space size={16}>
                <a onClick={() => handleRemove(selectedRows.map(x => x.operId))}>批量删除</a>
              </Space>
            </HasPermission>
          );
        }}
      ></SuperTable>
    </PageContainer>
  );
}
