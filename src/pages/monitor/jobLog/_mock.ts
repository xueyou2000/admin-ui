import { Request, Response } from 'express';
import { delay } from 'roadhog-api-doc';

export default delay(
  {
    'POST /api/monitor/jobLog/findByPage/:pageSize/:current': (req: Request, res: Response) => {
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
              jobLogId: 1,
              jobName: '系统默认（无参）',
              jobGroup: 'DEFAULT',
              invokeTarget: 'ryTask.ryNoParams',
              jobMessage: '测试无参 总共耗时：0毫秒',
              exceptionInfo: '',
              status: '0',
            },
          ],
          total: 1,
        },
      });
    },
  },
  600,
);
