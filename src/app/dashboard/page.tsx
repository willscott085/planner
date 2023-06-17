'use client';

import addDays from 'date-fns/addDays';
import getMonth from 'date-fns/getMonth';
import isToday from 'date-fns/isToday';
import startOfWeek from 'date-fns/startOfWeek';
import format from 'date-fns/format';
import React, { useEffect, useState } from 'react';
import { Day } from '@/app/components/Day';
import { Fragment } from 'react';
import getWeek from 'date-fns/getWeek';

type DayOptions = {
  dateString: string;
  isToday: boolean;
  isPadding: boolean;
};

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
  // const matrix: [[number, DayOptions]][] = new Array(rows).fill([]);
  const matrix: [[number, DayOptions]][] = [[], [], [], [], [], []];

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
          dateString: dateString.toDateString(),
          isToday: isToday(dateString),
          isPadding: getMonth(dateString) !== month,
        },
      ]);
    });

  return matrix;
}

export default function Dashboard() {
  const [selectedDate, setSelectedDate] = useState(new Date().toDateString());
  const [formattedDate, setFormattedDate] = useState(
    format(new Date(selectedDate), 'eeee, d LLLL yyyy', { weekStartsOn: 1 })
  );
  const monthIterable = createMonthIterable(
    new Date(selectedDate).getFullYear(),
    new Date(selectedDate).getMonth()
  );

  const handleDayClick = (dateString: string) => {
    setSelectedDate(new Date(dateString).toDateString());
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
        setFormattedDate(format(new Date(selectedDate), 'eeee'));
      } else if (isPreviousWeek) {
        setFormattedDate('Last week ' + format(new Date(selectedDate), 'eeee'));
      } else if (isNextWeek) {
        setFormattedDate('Next week ' + format(new Date(selectedDate), 'eeee'));
      } else {
        setFormattedDate(format(new Date(selectedDate), 'eeee, d LLLL yyyy'));
      }
    }
  }, [selectedDate]);

  return (
    <>
      <section className="flex-grow">{formattedDate}</section>
      <section className="w-full max-w-md">
        <div className="grid grid-cols-7">
          {monthIterable.map((week, idx) => (
            <Fragment key={idx}>
              {week.map(([day, opts]) => (
                <Day
                  key={day}
                  isPadding={opts.isPadding}
                  isToday={opts.isToday}
                  dateString={opts.dateString}
                  onDayClick={handleDayClick}
                >
                  {day}
                </Day>
              ))}
            </Fragment>
          ))}
        </div>
      </section>
    </>
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
