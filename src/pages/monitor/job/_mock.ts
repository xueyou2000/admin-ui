import { Request, Response } from 'express';
import { delay } from 'roadhog-api-doc';

export default delay(
  {
    'POST /api/monitor/job/findByPage/:pageSize/:current': (req: Request, res: Response) => {
      var pageNum = parseInt(req.params.current);
      var pageSize = parseInt(req.params.pageSize);

      return res.send({
        status: 0,
        res: {
          current: pageNum,
          records: [
            {
              createBy: 'admin',
              createTime: '2018-03-16 11:33:00',
              updateBy: null,
              updateTime: null,
              searchValue: null,
              beginTime: null,
              endTime: null,
              params: {},
              jobId: 1,
              jobName: '系统默认（无参）',
              jobGroup: 'DEFAULT',
              invokeTarget: 'ryTask.ryNoParams',
              cronExpression: '0/10 * * * * ?',
              misfirePolicy: '1',
              concurrent: '0',
              status: '1',
              remark: '',
            },
            {
              createBy: 'admin',
              createTime: '2018-03-16 11:33:00',
              updateBy: null,
              updateTime: null,
              searchValue: null,
              beginTime: null,
              endTime: null,
              params: {},
              jobId: 2,
              jobName: '系统默认（有参）',
              jobGroup: 'DEFAULT',
              invokeTarget: "ryTask.ryParams('ry')",
              cronExpression: '0/15 * * * * ?',
              misfirePolicy: '3',
              concurrent: '1',
              status: '1',
              remark: '',
            },
            {
              createBy: 'admin',
              createTime: '2018-03-16 11:33:00',
              updateBy: null,
              updateTime: null,
              searchValue: null,
              beginTime: null,
              endTime: null,
              params: {},
              jobId: 3,
              jobName: '系统默认（多参）',
              jobGroup: 'DEFAULT',
              invokeTarget: "ryTask.ryMultipleParams('ry', true, 2000L, 316.50D, 100)",
              cronExpression: '0/20 * * * * ?',
              misfirePolicy: '3',
              concurrent: '1',
              status: '1',
              remark: '',
            },
            {
              createBy: 'admin',
              createTime: '2020-09-23 18:13:38',
              updateBy: null,
              updateTime: null,
              searchValue: null,
              beginTime: null,
              endTime: null,
              params: {},
              jobId: 113,
              jobName: '1212',
              jobGroup: 'DEFAULT',
              invokeTarget: '1231',
              cronExpression: '0/10 * * * * ?',
              misfirePolicy: '1',
              concurrent: '0',
              status: '1',
              remark: null,
            },
          ],
          total: 4,
        },
      });
    },
    'POST /api/job/operLog/add': {
      status: 0,
    },
    'POST /api/job/operLog/remove': {
      status: 0,
    },
    'POST /api/job/operLog/changeStatus': {
      status: 0,
    },
    'POST /api/job/operLog/run': {
      status: 0,
    },
  },
  600,
);
