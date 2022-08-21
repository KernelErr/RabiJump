export default function isValidDate(date) {
  return date && Object.prototype.toString.call(date) === '[object Date]' && !isNaN(date);
}