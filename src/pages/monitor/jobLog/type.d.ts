interface JobLog {
  /** id */
  jobLogId: number;
  /** 任务名称 */
  jobName: string;
  /** 任务id */
  jobId: number;
  /** 任务组名 sys_job_group */
  jobGroup: string;
  /** 调用目标字符串 */
  invokeTarget: string;
  /** 日志信息 */
  jobMessage: string;
  /** 执行状态 job_run_status */
  status: '0' | '1';
  /** 异常信息 */
  exceptionInfo: string;
  /** 创建者 */
  createBy: string;
  /** 创建时间 */
  createTime: string;
  /** 更新者 */
  updateBy: string;
  /** 更新时间 */
  updateTime: string;
}

interface JobLogQuery extends QueryBase {
  jobLog: JobLog;
}
