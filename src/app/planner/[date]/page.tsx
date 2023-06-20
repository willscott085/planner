import { createMonthIterable } from '@/app/_utils';
import { DailyPlanner } from '@/app/components/DailyPlanner';
import { getXataClient } from '@/xata';
import { add } from 'date-fns';
import React from 'react';

const xata = getXataClient();

export default async function Day({ params }: { params: { date: string } }) {
  const { date } = params;
  let dateObj = new Date(date);
  const nextDay = add(dateObj, { days: 1 });
  const year = dateObj.getFullYear();
  const month = dateObj.getMonth();
  const monthIterable = createMonthIterable(year, month);

  const page = await xata.db.items
    .select(['id', 'title', 'created'])
    .filter('created', {
      $ge: dateObj,
      $le: nextDay,
    })
    .getPaginated({
      pagination: {
        size: 15,
      },
    });

  return (
    <>
      <DailyPlanner
        date={date}
        items={page.records.map(({ title, id }) => ({ title, id }))}
        monthIterable={monthIterable}
      />
    </>
  );
}
