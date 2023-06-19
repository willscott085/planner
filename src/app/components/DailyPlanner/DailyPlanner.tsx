'use client';

import { Day } from '@/app/components/Day';
import add from 'date-fns/add';
import addDays from 'date-fns/addDays';
import format from 'date-fns/format';
import getMonth from 'date-fns/getMonth';
import getWeek from 'date-fns/getWeek';
import isToday from 'date-fns/isToday';
import startOfWeek from 'date-fns/startOfWeek';
import sub from 'date-fns/sub';
import { Fragment, useEffect, useState } from 'react';
import { ChevronLeft } from '../icons/ChevronLeft';
import { ChevronRight } from '../icons/ChevronRight';
import isThisMonth from 'date-fns/isThisMonth';
import Link from 'next/link';

type DayOptions = {
  dateString: string;
  isToday: boolean;
  isPadding: boolean;
};

type Day = [number, DayOptions];

export function createMonthIterable(
  year: number,
  month: number,
  weekStartsOn: 0 | 1 | 2 | 3 | 4 | 5 | 6 = 1
) {
  const startDate = startOfWeek(new Date(year, month, 1), { weekStartsOn });
  const rows = 6;
  const cols = 7;
  const length = rows * cols;
  let currentRow = 0;
  let currentCol = 0;
  const matrix: Day[][] = Array.from({ length: rows }).map((_) => []);

  Array.from({ length })
    .map((_, index) => addDays(startDate, index))
    .forEach((dateString, index) => {
      const day = dateString.getDate();

      if (index !== 0 && index % cols <= 0) {
        currentRow++;
      }

      currentCol = index - currentRow * cols;

      matrix[currentRow].push([
        day,
        {
          dateString: format(dateString, 'yyyy-MM-dd'),
          isToday: isToday(dateString),
          isPadding: getMonth(dateString) !== month,
        },
      ]);
    });

  return matrix;
}

interface Props {
  date: string;
  items: Array<{ title: string; id: number }>;
}

export function DailyPlanner({ date, items }: Props) {
  const [selectedDate, setSelectedDate] = useState(
    new Date(date).toDateString()
  );
  const isCurrentMonth = isThisMonth(new Date(selectedDate));
  const [formattedDay, setFormattedDay] = useState(
    format(new Date(selectedDate), 'eeee')
  );
  const [formattedMonthYear, setFormattedMonthYear] = useState(
    format(new Date(selectedDate), 'MM yyyy')
  );
  const monthIterable = createMonthIterable(
    new Date(selectedDate).getFullYear(),
    new Date(selectedDate).getMonth()
  );

  const nextMonthDateString = () =>
    format(add(new Date(selectedDate), { months: 1 }), 'yyyy-MM-dd');

  const previousMonthDateString = () =>
    format(sub(new Date(selectedDate), { months: 1 }), 'yyyy-MM-dd');

  const todayDateString = () => format(new Date(), 'yyyy-MM-dd');

  const handlePlannerKeyDown = (evt: KeyboardEvent) => {
    if (evt.key === 'ArrowUp') {
      setSelectedDate((ds) => sub(new Date(ds), { days: 7 }).toDateString());
    } else if (evt.key === 'ArrowRight') {
      setSelectedDate((ds) => add(new Date(ds), { days: 1 }).toDateString());
    } else if (evt.key === 'ArrowDown') {
      setSelectedDate((ds) => add(new Date(ds), { days: 7 }).toDateString());
    } else if (evt.key === 'ArrowLeft') {
      setSelectedDate((ds) => sub(new Date(ds), { days: 1 }).toDateString());
    }
  };

  const isSelected = (dateString: string) => {
    return dateString === selectedDate;
  };

  useEffect(() => {
    if (selectedDate) {
      const selectedWeekNumber = getWeek(new Date(selectedDate), {
        weekStartsOn: 1,
      });
      const currentWeekNumber = getWeek(new Date(), { weekStartsOn: 1 });
      const isCurrentWeek = selectedWeekNumber === currentWeekNumber;
      const isPreviousWeek = currentWeekNumber - 1 === selectedWeekNumber;
      const isNextWeek = currentWeekNumber + 1 === selectedWeekNumber;

      if (isCurrentWeek) {
        setFormattedDay(format(new Date(selectedDate), 'eeee'));
      } else if (isPreviousWeek) {
        setFormattedDay('Last Week ' + format(new Date(selectedDate), 'eeee'));
      } else if (isNextWeek) {
        setFormattedDay('Next ' + format(new Date(selectedDate), 'eeee'));
      } else {
        setFormattedDay(format(new Date(selectedDate), 'eeee, d LLLL yyyy'));
      }

      setFormattedMonthYear(format(new Date(selectedDate), 'MMMM, yyyy'));
    }
  }, [selectedDate]);

  useEffect(() => {
    document.addEventListener('keydown', handlePlannerKeyDown);

    return () => {
      document.removeEventListener('keydown', handlePlannerKeyDown);
    };
  }, []);

  return (
    <main className="flex flex-col sm:flex-row">
      <section className="flex-grow">
        <h1 className="py-4">{formattedDay}</h1>
        <ul>
          {items.map(({ id, title }) => (
            <li key={id}>{title}</li>
          ))}
        </ul>
      </section>
      <section className="w-full max-w-md">
        <div className="flex justify-between items-center">
          <h2 className="py-4">{formattedMonthYear}</h2>
          {!isCurrentMonth && (
            <Link
              className="text-xs py-1 px-2 shadow-2 rounded-xl"
              href={`/planner/${todayDateString()}`}
            >
              Today
            </Link>
          )}
          <div className="flex justify-between gap-4">
            <Link
              href={`/planner/${previousMonthDateString()}`}
              className="hover:shadow-2 rounded-full p-3"
            >
              <ChevronLeft className="h-5 w-5" />
            </Link>
            <Link
              href={`/planner/${nextMonthDateString()}`}
              className="hover:shadow-2 rounded-full p-3"
            >
              <ChevronRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-7">
          {monthIterable.map((week, idx) => (
            <Fragment key={idx}>
              {week.map(([day, opts]) => (
                <Day
                  key={day}
                  isPadding={opts.isPadding}
                  isToday={opts.isToday}
                  isSelected={isSelected(opts.dateString)}
                  dateString={opts.dateString}
                >
                  {day}
                </Day>
              ))}
            </Fragment>
          ))}
        </div>
      </section>
    </main>
  );
}

// given a month + year create datastructure for representing a month with padding included, sub-divided as weeks
// [[[29, {dateString: 'Thu Jun 15 2023 14:04:32 GMT+0100 (Irish Standard Time)', isToday: false, isPadding: true}], 30, 31, 1, 2, 3, 4], [], [], [], []]
// navigation for incrementing/decrementing month
// select for picking month/year
// grid/table layout with day of week header (first letter only)
// indicate left/right padding of 1st and last week if needed
// "today" indication
// selected day indication
// hover effect over day
// "go to today" functionality

// calendar widget as data
// given a month & year, returns a correct data structure
// month starts on correct day of week
// month ends on correct day of week
// correctly adds left padding (previous month tail)
// correctly adds right padding (next month head)
// month has correct number of weeks
// today is correctly indicated
// current month & year is correctly indicated
// forward button increments month correctly
// back button decrements month correctly
// select updates month correctly
// select updates year correctly
// clicking on a date returns a datestring correctly
// changing the month takes less than x ms
