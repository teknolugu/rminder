import dayjs from 'dayjs';

/* eslint-disable-next-line */
export function getCurrentDate () {
  return dayjs(new Date()).format('DD-MM-YYYY');
}
