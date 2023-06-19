import { DailyPlanner } from '@/app/components/DailyPlanner';
import { getXataClient } from '@/xata';
import { add } from 'date-fns';

const xata = getXataClient();

const valiDate = (dateString: string = '') => {
  if (typeof dateString !== 'string') return '';

  const [year, month, day] = dateString.split('-');

  if (!year || !month || !day) return '';

  return dateString;
};

export default async function Planner({
  params,
}: {
  params: { date: string };
}) {
  const { date } = params;
  let dateObj = new Date(valiDate(date));
  const nextDay = add(dateObj, { days: 1 });

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
      />
    </>
  );
}
