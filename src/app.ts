import * as dayjs from 'dayjs';
import * as relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/zh-cn';
import './global.less';

export const locale = {
  default: 'zh-CN',
};

dayjs.locale('zh-cn');
dayjs.extend(relativeTime);
