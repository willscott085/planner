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

  if (dateObj.toString() === 'Invalid Date') {
    dateObj = new Date();
  }

  const nextDay = add(dateObj, { days: 1 });

  const page = await xata.db.items
    .select([
      'id',
      'title',
      'description',
      'completed',
      'due',
      'type',
      'created',
    ])
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
      <div>{date}</div>
      <ul>
        {page.records.map(({ id, title }) => (
          <li key={id}>{title}</li>
        ))}
      </ul>
    </>
  );
}
