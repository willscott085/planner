import format from 'date-fns/format';
import Link from 'next/link';
import { getXataClient } from '../xata';

const xata = getXataClient();

export default async function Planner() {
  return (
    <main className="flex min-h-screen justify-center items-center flex-col">
      <h1>Welcome, traveller!</h1>
      <ul>
        <li>
          Go to the{' '}
          <Link href={`planner/${format(new Date(), 'yyyy-MM-dd')}`}>
            what<span className="text-orange-400">i</span>did planner™
          </Link>
        </li>
      </ul>
    </main>
  );
}
