import { isAfter as dateFnsIsAfter, parseISO } from 'date-fns';
import isString from '../../utils/isString';
export default function isAfter(date, dateToCompare) {
  const dayOne = isString(date) ? parseISO(date) : date;
  const dayTwo = isString(dateToCompare) ? parseISO(dateToCompare) : dateToCompare;
  return dateFnsIsAfter(dayOne, dayTwo);
}