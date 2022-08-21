import isObject from './isObject';
export default function isPromise(value) {
  return isObject(value) && typeof value.then === 'function';
}