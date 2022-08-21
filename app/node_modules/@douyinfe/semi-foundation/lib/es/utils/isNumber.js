export default function isNumber(value) {
  return typeof value === 'number' || Object.prototype.toString.call(value) === '[object Number]';
}