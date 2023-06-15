'use client';

import addDays from 'date-fns/addDays';
import getMonth from 'date-fns/getMonth';
import isToday from 'date-fns/isToday';
import startOfWeek from 'date-fns/startOfWeek';
import { Day } from '../Day';
import { useEffect, useState } from 'react';

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

function Month() {
  const [selectedDate, setSelectedDate] = useState(new Date().toDateString());
  const monthIterable = createMonthIterable(
    new Date(selectedDate).getFullYear(),
    new Date(selectedDate).getMonth()
  );

  const handleDayClick = (dateString: string) => {
    console.log(new Date(dateString).toDateString());

    setSelectedDate(new Date(dateString).toDateString());
  };

  useEffect(() => {
    console.log(selectedDate);
  }, [setSelectedDate]);

  return (
    <>
      {monthIterable.map((week, idx) => (
        <div key={idx} className="flex">
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
        </div>
      ))}
    </>
  );
}

export { Month };
