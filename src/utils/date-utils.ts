import * as dayjs from 'dayjs';

/**
 * 设置开始 00:00:00时分秒
 */
export function setDayliStart(d: Date) {
  if (!d) {
    return d;
  }
  return dayjs(d)
    .hour(0)
    .minute(0)
    .second(0)
    .toDate();
}

/**
 * 设置结束 23:59:59时分秒
 */
export function setDayliEnd(d: Date) {
  if (!d) {
    return d;
  }
  return dayjs(d)
    .hour(23)
    .minute(59)
    .second(59)
    .toDate();
}
