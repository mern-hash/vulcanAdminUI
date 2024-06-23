import { isValid,formatISO,parseISO, addDays } from 'date-fns'
import format from 'date-fns/format'
import dayjs from 'dayjs'

export const DateFormat = {
  date: 'MM/dd/yyyy',
  dateTime: 'MM/dd/yyyy hh:mm a',
  dateMonthTime: 'dd MMM yyyy, hh:mm a',
  monthDate: 'MMM yyyy',
  dateMonthYear: 'dd-MMM-yyyy',
  time: 'hh:mm a',
  timepicker: 'hh:mm:ss',
}

export class DateUtility {
  static dateToString(date,formatStr = DateFormat.dateTime) {
    if (!date) return ''
    const newDate = new Date(date)
    if (isValid(newDate)) {
      return format(newDate,formatStr,{})
    }
    return ''
  }

  static formatISO(date) {
    if (!date) return ''
    return formatISO(new Date(date))
  }

  static parseISO(date) {
    if (!date) return ''
    return parseISO(new Date(date))
  }

  static toDate(unixTimestamp) {
    return new Date(unixTimestamp * 1000)
  }

  static isPastDate(date) {
    if (!date) return false;
    return new Date(date) < new Date();
  }

  static isOldDate(date1, date2) {
    if (!date1 || !date2) return false;
    return new Date(date1) < new Date(date2);
  }

  static addDate(date1,day) {
    return addDays(new Date(date1),day);
  }

  static toDayJS = (date) => {
    if (date) {
      return dayjs(date)
    }
    return ''
  }

  static disabledNotAdultDate = (date) => {
    return date && date > dayjs().subtract(18,"year").endOf('day');
  }

  static defaultDateValue = () => {
    return dayjs().subtract(18,"year");
  }

  static disabledPastDate = (current) => {
    return current && current < dayjs().endOf('day');
  }
}
