import HasPermission from '@/components/Authorized/HasPermission';
import { SuperTable } from '@/components/SuperTable';
import { CloseOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import { ActionType, ProColumns } from '@ant-design/pro-table';
import { Button, DatePicker, Form, message, Modal, Space } from 'antd';
import React, { useRef } from 'react';
import { cleanLoginLog, queryLoginLogByPage, removeLoginLog } from './service';
import * as dayjs from 'dayjs';

export default function LoginLogQuery() {
  const actionRef = useRef<ActionType>();

  function handleRemove(ids: number[]) {
    Modal.confirm({
      title: '是否删除所选日志数据?',
      onOk: () =>
        removeLoginLog(ids).then(() => {
          message.success('删除登陆日志成功!');
          if (actionRef.current?.clearSelected) {
            actionRef.current?.clearSelected();
          }
          actionRef.current?.reload();
        }),
    });
  }

  function handleClean() {
    Modal.confirm({
      title: '是否清空所有登陆日志数据?',
      onOk: () =>
        cleanLoginLog().then(() => {
          message.success('清空登陆日志成功!');
          if (actionRef.current?.clearSelected) {
            actionRef.current?.clearSelected();
          }
          actionRef.current?.reload();
        }),
    });
  }

  const columns: ProColumns<LoginInfo>[] = [
    {
      title: '访问编号',
      dataIndex: 'infoId',
      search: false,
    },
    {
      title: '登陆账号',
      dataIndex: 'loginName',
    },
    {
      title: '用户ID',
      dataIndex: 'userId',
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
      title: '登录IP',
      dataIndex: 'ipaddr',
    },
    {
      title: '登录地点',
      dataIndex: 'loginLocation',
      search: false,
    },
    {
      title: '浏览器类型',
      dataIndex: 'browser',
      search: false,
    },
    {
      title: '操作系统',
      dataIndex: 'os',
      search: false,
    },
    {
      title: '提示消息',
      dataIndex: 'msg',
      search: false,
    },
    {
      title: '访问时间',
      dataIndex: 'loginTime',
      search: false,
      renderText: (_: string, record) => {
        const loginTime = dayjs(record.loginTime);
        return dayjs()
          .subtract(2, 'day')
          .isBefore(loginTime)
          ? loginTime.fromNow()
          : _;
      },
    },
    {
      title: '访问时间',
      dataIndex: ['dateRanges', 'loginTime'],
      hideInTable: true,
      renderFormItem: item => {
        return (
          <Form.Item name={item.dataIndex} label="">
            <DatePicker.RangePicker />
          </Form.Item>
        );
      },
    },
  ];

  return (
    <PageContainer>
      <SuperTable<LoginInfo>
        headerTitle="登陆日志"
        rowKey="infoId"
        columns={columns}
        pagination={{ pageSize: 10 }}
        actionRef={actionRef}
        search={{ labelWidth: 120 }}
        request={params =>
          queryLoginLogByPage({ ...params }).then(page => {
            return { success: true, data: page.records, total: page.total };
          })
        }
        toolBarRender={() => [
          <HasPermission key="add" authority="monitor:loginlog:remove">
            <Button type="ghost" danger onClick={handleClean}>
              <CloseOutlined /> 清空
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
            <HasPermission authority="monitor:loginlog:remove">
              <Space size={16}>
                <a onClick={() => handleRemove(selectedRows.map(x => x.infoId))}>批量删除</a>
              </Space>
            </HasPermission>
          );
        }}
      ></SuperTable>
    </PageContainer>
  );
}
