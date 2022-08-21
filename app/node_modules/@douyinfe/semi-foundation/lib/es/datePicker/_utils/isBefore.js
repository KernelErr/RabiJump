import { isBefore as dateFnsIsBefore, parseISO } from 'date-fns';
import isString from '../../utils/isString';
export default function isBefore(date, dateToCompare) {
  const dayOne = isString(date) ? parseISO(date) : date;
  const dayTwo = isString(dateToCompare) ? parseISO(dateToCompare) : dateToCompare;
  return dateFnsIsBefore(dayOne, dayTwo);
}