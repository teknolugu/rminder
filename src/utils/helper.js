/* eslint-disable */

import dayjs from 'dayjs';

export function getCurrentDate () {
  return dayjs(new Date()).format('DD-MM-YYYY');
}

export function debounce(func, wait, immediate) {
  let timeout;

  return function () {
    const context = this;
    const args = arguments;
    const later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;

    clearTimeout(timeout);

    timeout = setTimeout(later, wait);

    if (callNow) func.apply(context, args);
  };
}
