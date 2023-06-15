import { Month } from './components/Month';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <Month />
      </div>
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
