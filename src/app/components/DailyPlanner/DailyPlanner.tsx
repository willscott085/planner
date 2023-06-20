'use client';

import { createDateHelper, createMonthIterable } from '@/app/_utils';
import { Day } from '@/app/components/Day';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Fragment, useEffect, useState } from 'react';
import { ChevronLeft } from '../icons/ChevronLeft';
import { ChevronRight } from '../icons/ChevronRight';
import { DayT } from '@/app/_utils/createMonthIterable';

interface Props {
  date: string;
  items: { title: string | null | undefined; id: string }[];
  monthIterable: DayT[][];
}

export function DailyPlanner({ date, items, monthIterable }: Props) {
  const router = useRouter();
  const [dateHelper, setDateHelper] = useState(createDateHelper(date));

  useEffect(() => {
    if (date) {
      setDateHelper(createDateHelper(date));
    }
  }, [date]);

  useEffect(() => {
    const handlePlannerKeyDown = (evt: KeyboardEvent) => {
      if (evt.key === 'ArrowUp') {
        router.push('/planner/' + dateHelper.subDays(7));
      } else if (evt.key === 'ArrowRight') {
        router.push('/planner/' + dateHelper.addDays(1));
      } else if (evt.key === 'ArrowDown') {
        router.push('/planner/' + dateHelper.addDays(7));
      } else if (evt.key === 'ArrowLeft') {
        router.push('/planner/' + dateHelper.subDays(1));
      }
    };

    document.addEventListener('keydown', handlePlannerKeyDown);

    return () => {
      document.removeEventListener('keydown', handlePlannerKeyDown);
    };
  }, [dateHelper, router]);

  return (
    <main className="flex flex-col sm:flex-row">
      <section className="flex-grow">
        <h1 className="py-4">{dateHelper.plannerTitle}</h1>
        <ul>
          {items.map(({ id, title }) => (
            <li key={id}>{title}</li>
          ))}
        </ul>
      </section>
      <section className="w-full max-w-sm">
        <div className="flex justify-between items-center">
          <h2 className="py-4">{dateHelper.shortMonthYearStr}</h2>
          {!dateHelper.isCurrentMonth && (
            <Link
              className="text-xs py-1 px-2 shadow-2 rounded-xl"
              href={`/planner/${dateHelper.todayStr}`}
            >
              Today
            </Link>
          )}
          <div className="flex justify-between gap-4">
            <Link
              href={`/planner/${dateHelper.previousMonthStr}`}
              className="hover:shadow-2 rounded-full p-3"
            >
              <ChevronLeft className="h-5 w-5" />
            </Link>
            <Link
              href={`/planner/${dateHelper.nextMonthStr}`}
              className="hover:shadow-2 rounded-full p-3"
            >
              <ChevronRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-2">
          {monthIterable.map((week, idx) => (
            <Fragment key={idx}>
              {week.map(([day, opts]) => (
                <Day
                  key={day}
                  isPadding={opts.isPadding}
                  isToday={opts.isToday}
                  isSelected={dateHelper.isDaySelected(opts.dateString)}
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
