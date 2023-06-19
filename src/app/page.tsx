import { DailyPlanner } from './components/DailyPlanner';
import { getXataClient } from '../xata';
import Link from 'next/link';
import format from 'date-fns/format';

const xata = getXataClient();

export default async function Planner() {
  return (
    <main className="flex min-h-screen justify-center items-center">
      <h1>Welcome, traveller!</h1>
      <ul>
        <li>
          <Link href={`planner/${format(new Date(), 'yyyy-MM-dd')}`}>
            Daily planner
          </Link>
        </li>
      </ul>
    </main>
  );
}
