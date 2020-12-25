import { Request, Response } from 'express';
import { delay } from 'roadhog-api-doc';

export default delay(
  {
    'POST /api/system/config/findByPage/:pageSize/:current': (req: Request, res: Response) => {
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
              remark: '',
              configId: 1,
              configName: '测试配置',
              configKey: 'MY_TEST',
              configValue: '{"appkey": "123456"}',
              configType: 'TRUE',
            },
          ],
          total: 1,
        },
      });
    },
    'POST /api/system/config/add': {
      status: 0,
    },
    'POST /api/system/config/remove': {
      status: 0,
    },
    'POST /api/system/config/update': {
      status: 0,
    },
  },
  600,
);
