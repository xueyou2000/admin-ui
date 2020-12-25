interface Job {
  /** 任务id */
  jobId: number;
  /** 任务名称 */
  jobName: string;
  /** 任务组名 sys_job_group */
  jobGroup: string;
  /** 调用目标字符串 */
  invokeTarget: string;
  /** cron执行表达式 */
  cronExpression: string;
  /** 计划执行错误策略 job_misfire_polic */
  misfirePolicy: '1' | '2' | '3';
  /** 是否并发执行 job_concurrent */
  concurrent: '0' | '1';
  /** 任务状态 job_status */
  status: '0' | '1';
  /** 备注 */
  remark: string;
  /** 创建者 */
  createBy: string;
  /** 创建时间 */
  createTime: string;
  /** 更新者 */
  updateBy: string;
  /** 更新时间 */
  updateTime: string;
}

interface JobQuery extends QueryBase {
  job: Job;
}
