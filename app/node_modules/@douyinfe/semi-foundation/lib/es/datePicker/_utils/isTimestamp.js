import isValidDate from './isValidDate';
import isNumber from '../../utils/isNumber';
export default function isTimestamp(ts) {
  return isNumber(ts) && isValidDate(new Date(ts));
}