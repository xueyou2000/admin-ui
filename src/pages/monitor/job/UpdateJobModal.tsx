import ModalContent from '@/components/ModalPopup/ModalContent';
import ModalFooter from '@/components/ModalPopup/ModalFooter';
import { dictToPickerData, renderDictSelect, useSubmit } from '@/utils/page-utils';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Button, Form, Input, message, Radio, Select, Tooltip } from 'antd';
import React from 'react';
import { updateJob } from './service';
import merge from 'lodash/merge';

export default function UpdateJobModal({ job, dictMaps }: { job: Job; dictMaps: DictMaps }) {
  const { loading, submitHandle } = useSubmit<Job>(data =>
    updateJob(merge({}, job, data)).then(() => {
      message.success('修改定时任务成功');
    }),
  );

  return (
    <Form<Job>
      onFinish={submitHandle}
      initialValues={job}
      labelCol={{ xs: { span: 24 }, sm: { span: 5 } }}
      wrapperCol={{ xs: { span: 24 }, sm: { span: 16 } }}
    >
      <ModalContent>
        <Form.Item name="jobName" label="任务名称" rules={[{ required: true, message: '请输入任务名称' }]}>
          <Input placeholder="请输入任务名称" />
        </Form.Item>
        <Form.Item name="jobGroup" label="任务组名" rules={[{ required: true, message: '请选择任务组名' }]}>
          <Select<string>>{renderDictSelect(dictMaps.sys_job_group)}</Select>
        </Form.Item>
        <Form.Item name="invokeTarget" label="调用方法" rules={[{ required: true, message: '请输入调用方法' }]}>
          <Input
            placeholder="请输入调用目标字符串"
            suffix={
              <Tooltip
                title={
                  <div>
                    Bean调用示例：taskTest.params('ry')
                    <br />
                    Class类调用示例：com.ruoyi.quartz.task.Bean调用示例：taskTest.params('ry')
                    <br />
                    参数说明：支持字符串，布尔类型，长整型，浮点型，整型
                  </div>
                }
              >
                <QuestionCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
              </Tooltip>
            }
          />
        </Form.Item>
        <Form.Item
          name="cronExpression"
          label="cron执行表达式"
          rules={[{ required: true, message: '请输入cron执行表达式' }]}
        >
          <Input placeholder="请输入cron执行表达式" />
        </Form.Item>
        <Form.Item name="misfirePolicy" label="错误策略">
          <Radio.Group optionType="button" options={dictToPickerData(dictMaps.job_misfire_polic)} />
        </Form.Item>
        <Form.Item name="concurrent" label="是否并发执行">
          <Radio.Group optionType="button" options={dictToPickerData(dictMaps.job_concurrent)} />
        </Form.Item>
        <Form.Item name="status" label="状态">
          <Radio.Group options={dictToPickerData(dictMaps.job_status)} />
        </Form.Item>
      </ModalContent>
      <ModalFooter>
        <Button>取消</Button>
        <Button type="primary" loading={loading} htmlType="submit">
          确定
        </Button>
      </ModalFooter>
    </Form>
  );
}
