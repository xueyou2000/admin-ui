import HasPermission from '@/components/Authorized/HasPermission';
import { SuperTable } from '@/components/SuperTable';
import { autoQuery, dictToValueEnum, getDictLabel, useDicts } from '@/utils/page-utils';
import { PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import { ActionType, ProColumns } from '@ant-design/pro-table';
import { Button, Divider, message, Modal, Space, Switch } from 'antd';
import React, { useRef } from 'react';
import { changeJobStatus, queryJobByPage, removeJob, runTask } from './service';
import AddJobModal from './AddJobModal';
import UpdateJobModal from './UpdateJobModal';
import JobLogModal from '../jobLog/JobLogModal';
import modalPopup from '@/components/ModalPopup';

export default function JobQuery() {
  const actionRef = useRef<ActionType>();
  const dictMaps = useDicts({
    sys_job_group: [],
    job_misfire_polic: [],
    job_concurrent: [],
    job_status: [],
  });

  function handleAdd() {
    modalPopup(<AddJobModal dictMaps={dictMaps} />, { title: '新增定时任务' }, autoQuery(actionRef));
  }

  function handleUpdate(record: Job) {
    modalPopup(<UpdateJobModal job={record} dictMaps={dictMaps} />, { title: '修改定时任务' }, autoQuery(actionRef));
  }

  function handleLog(record: Job) {
    modalPopup(<JobLogModal jobId={record.jobId} />, { title: '运行日志', width: 1300 });
  }

  function handleRemove(ids: number[]) {
    Modal.confirm({
      title: '是否删除所选定时任务?',
      onOk: () =>
        removeJob(ids).then(() => {
          message.success('删除定时任务成功!');
          if (actionRef.current?.clearSelected) {
            actionRef.current?.clearSelected();
          }
          actionRef.current?.reload();
        }),
    });
  }

  function handleRun(record: Job) {
    Modal.confirm({
      title: '警告',
      content: `是否要立即执行一次"${record.jobName}"任务吗?`,
      onOk: () =>
        runTask(record).then(() => {
          message.success('执行成功!');
          actionRef.current?.reload();
        }),
    });
  }

  function handleChangeStatus(record: Job) {
    const nextStatus = record.status === '0' ? '1' : '0';
    Modal.confirm({
      title: '警告',
      content: (
        <p>
          是否要将{record.jobName}任务状态改为
          <span style={{ color: '#FF5722' }}>{getDictLabel(nextStatus, dictMaps.job_status)}</span>吗?
        </p>
      ),
      onOk: () =>
        changeJobStatus(record.jobId, nextStatus).then(() => {
          message.success('操作成功!');
          actionRef.current?.reload();
        }),
    });
  }

  const columns: ProColumns<Job>[] = [
    {
      title: '任务编号',
      dataIndex: 'jobId',
      search: false,
    },
    {
      title: '任务名称',
      dataIndex: ['fuzzyMatches', 'jobName'],
      renderText: (_, record) => {
        return record.jobName;
      },
    },
    {
      title: '任务组名',
      dataIndex: 'jobGroup',
      valueEnum: dictToValueEnum(dictMaps.sys_job_group),
    },
    {
      title: '调用目标字符串',
      dataIndex: 'invokeTarget',
      search: false,
    },
    {
      title: 'cron执行表达式',
      dataIndex: 'cronExpression',
      search: false,
    },
    {
      title: '计划执行错误策略',
      dataIndex: 'misfirePolicy',
      valueEnum: dictToValueEnum(dictMaps.job_misfire_polic),
    },
    {
      title: '是否并发执行',
      dataIndex: 'concurrent',
      valueEnum: dictToValueEnum(dictMaps.job_concurrent),
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueEnum: dictToValueEnum(dictMaps.job_status),
      renderText: (_, record) => {
        return <Switch checked={record.status === '0'} onChange={() => handleChangeStatus(record)}></Switch>;
      },
    },
    {
      title: '操作',
      width: '220px',
      dataIndex: 'action',
      search: false,
      render: (_, record) => (
        <>
          <HasPermission authority="monitor:job:changeStatus">
            <a onClick={() => handleRun(record)}>执行一次</a>
            <Divider type="vertical" />
          </HasPermission>

          <HasPermission authority="monitor:job:update">
            <a onClick={() => handleUpdate(record)}>编辑</a>
            <Divider type="vertical" />
          </HasPermission>

          <HasPermission authority="monitor:job:remove">
            <a onClick={() => handleRemove([record.jobId])}>删除</a>
            <Divider type="vertical" />
          </HasPermission>

          <a onClick={() => handleLog(record)}>日志</a>
        </>
      ),
    },
  ];

  return (
    <PageContainer>
      <SuperTable<Job>
        headerTitle="定时任务"
        rowKey="jobId"
        columns={columns}
        pagination={{ pageSize: 10 }}
        actionRef={actionRef}
        search={{ labelWidth: 120 }}
        request={params =>
          queryJobByPage({ ...params }).then(page => {
            return { success: true, data: page.records, total: page.total };
          })
        }
        toolBarRender={() => [
          <HasPermission key="add" authority="monitor:job:add">
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
            <HasPermission authority="monitor:job:remove">
              <Space size={16}>
                <a onClick={() => handleRemove(selectedRows.map(x => x.jobId))}>批量删除</a>
              </Space>
            </HasPermission>
          );
        }}
      ></SuperTable>
    </PageContainer>
  );
}
