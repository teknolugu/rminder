/* eslint-disable */
let id = 0;

export function useComponentId(prefix) {
  id += 1;

  return `${prefix}-${id}`;
}
