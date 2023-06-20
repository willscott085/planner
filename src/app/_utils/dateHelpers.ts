import add from 'date-fns/add';
import format from 'date-fns/format';
import getMonth from 'date-fns/getMonth';
import getWeek from 'date-fns/getWeek';
import getYear from 'date-fns/getYear';
import isThisMonth from 'date-fns/isThisMonth';
import isThisWeek from 'date-fns/isThisWeek';
import sub from 'date-fns/sub';

const createDateHelper = (selectedDate: string) => ({
  today: new Date(),
  selectedDate: new Date(selectedDate),
  get selectedMonth() {
    return getMonth(this.selectedDate);
  },
  get selectedYear() {
    return getYear(this.selectedDate);
  },

  standardFormatStr: 'yyyy-MM-dd',
  longDayFormatStr: 'eeee',
  shortMonthYearFormatStr: 'LLL yyyy',
  fullDateFormatStr: 'eeee, d LLLL yyyy',

  get isToday() {
    return selectedDate === format(this.today, this.standardFormatStr);
  },
  get isCurrentMonth() {
    return isThisMonth(this.selectedDate);
  },
  get isPreviousWeek() {
    return this.weekNumber - 1 === this.selectedWeekNumber;
  },
  get isCurrentWeek() {
    return isThisWeek(this.selectedDate);
  },
  get isNextWeek() {
    return this.weekNumber + 1 === this.selectedWeekNumber;
  },

  get weekNumber() {
    return getWeek(this.today, { weekStartsOn: 1 });
  },
  get selectedWeekNumber() {
    return getWeek(this.selectedDate, {
      weekStartsOn: 1,
    });
  },
  get longDayStr() {
    return format(this.selectedDate, this.longDayFormatStr);
  },
  get shortMonthYearStr() {
    return format(this.selectedDate, this.shortMonthYearFormatStr);
  },
  get fullDateStr() {
    return format(this.selectedDate, this.fullDateFormatStr);
  },
  get todayStr() {
    return format(this.today, this.standardFormatStr);
  },
  get nextMonthStr() {
    return format(
      add(this.selectedDate, { months: 1 }),
      this.standardFormatStr
    );
  },
  get previousMonthStr() {
    return format(
      sub(this.selectedDate, { months: 1 }),
      this.standardFormatStr
    );
  },
  get plannerTitle() {
    if (this.isCurrentWeek) {
      return this.longDayStr;
    } else if (this.isPreviousWeek) {
      return 'Last Week ' + this.longDayStr;
    } else if (this.isNextWeek) {
      return 'Next ' + this.longDayStr;
    }

    return this.fullDateStr;
  },

  addDays(days: number = 1) {
    return format(add(this.selectedDate, { days }), this.standardFormatStr);
  },
  subDays(days: number = 1) {
    return format(sub(this.selectedDate, { days }), this.standardFormatStr);
  },
  isDaySelected(dateString: string) {
    return dateString === selectedDate;
  },
});

export { createDateHelper };
