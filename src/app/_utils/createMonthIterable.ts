import addDays from 'date-fns/addDays';
import format from 'date-fns/format';
import getMonth from 'date-fns/getMonth';
import isToday from 'date-fns/isToday';
import startOfWeek from 'date-fns/startOfWeek';

type DayOptions = {
  dateString: string;
  isToday: boolean;
  isPadding: boolean;
};

export type DayT = [number, DayOptions];

const hashMap = new Map();

export function createMonthIterable(
  year: number,
  month: number,
  weekStartsOn: 0 | 1 | 2 | 3 | 4 | 5 | 6 = 1
) {
  if (hashMap.has(`${year}-${month}`)) {
    console.log('cache hit on ', `${year}-${month}`);
    return hashMap.get(`${year}-${month}`);
  }

  if (hashMap.size >= 100) {
    console.log(
      'cache clear =========================================DDDDDDDD'
    );

    hashMap.clear();
  }

  console.log(
    'new calculation --------------------------------------------- XXXXXX',
    hashMap.size
  );

  const startDate = startOfWeek(new Date(year, month, 1), { weekStartsOn });
  const rows = 6;
  const cols = 7;
  const length = rows * cols;
  let currentRow = 0;
  let currentCol = 0;
  const matrix: DayT[][] = Array.from({ length: rows }).map((_) => []);

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
          dateString: format(dateString, 'yyyy-MM-dd'),
          isToday: isToday(dateString),
          isPadding: getMonth(dateString) !== month,
        },
      ]);
    });

  hashMap.set(`${year}-${month}`, matrix);

  return matrix;
}
