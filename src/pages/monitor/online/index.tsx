import HasPermission from '@/components/Authorized/HasPermission';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import { message, Modal } from 'antd';
import React, { useEffect, useRef } from 'react';
import { queryOnlineUserList, forceLogout } from './service';

export default function UserOnlineQuery() {
  const actionRef = useRef<ActionType>();

  function handleLogout(record: UserOnline) {
    Modal.confirm({
      title: '警告',
      content: `是否强退用户"${record.loginName}"?`,
      onOk: () =>
        forceLogout(record.tokenId).then(() => {
          message.success('强退成功!');
          actionRef.current?.reload();
        }),
    });
  }

  const columns: ProColumns<UserOnline>[] = [
    {
      title: '会话编号',
      dataIndex: 'tokenId',
      search: false,
    },
    {
      title: '部门名称',
      dataIndex: 'deptName',
      search: false,
    },
    {
      title: '登陆账户',
      dataIndex: 'loginName',
    },
    {
      title: '登录IP',
      dataIndex: 'ipaddr',
    },
    {
      title: '登录地址',
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
      title: '登录时间',
      dataIndex: 'loginTime',
      search: false,
    },
    {
      title: '操作',
      width: '150px',
      dataIndex: 'action',
      search: false,
      render: (_, record) => (
        <>
          <HasPermission authority="monitor:online:forceLogout">
            <a onClick={() => handleLogout(record)}>强退</a>
          </HasPermission>
        </>
      ),
    },
  ];

  useEffect(() => {
    actionRef.current?.reload();
  }, []);

  return (
    <PageContainer>
      <ProTable<UserOnline, UserOnlineQueryParams>
        headerTitle="在线用户"
        rowKey="tokenId"
        columns={columns}
        actionRef={actionRef}
        pagination={false}
        search={{ labelWidth: 120 }}
        request={params =>
          queryOnlineUserList({ ...params }).then(list => {
            return { success: true, data: list, total: list.length };
          })
        }
      ></ProTable>
    </PageContainer>
  );
}
