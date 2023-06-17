import { DailyPlanner } from './components/DailyPlanner';

export default function Home() {
  return (
    <main className="flex flex-col sm:flex-row">
      <DailyPlanner />
    </main>
  );
}
