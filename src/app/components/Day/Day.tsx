'use client';

import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';

interface Props {
  isPadding: boolean;
  dateString: string;
  isToday: boolean;
  isSelected: boolean;
  children: React.ReactNode;
}

function Day(props: Props) {
  const { isPadding, isToday, isSelected, dateString, children } = props;

  return (
    <Link
      className={clsx(
        'flex rounded-full justify-center items-center transition-colors ease-in duration-250 aspect-square hover:shadow-2',
        {
          'text-neutral-500': isPadding,
          'bg-blue-600': isToday,
          'bg-neutral-400': isSelected && !isToday,
        }
      )}
      href={`/planner/${dateString}`}
    >
      {children}
    </Link>
  );
}

export { Day };
