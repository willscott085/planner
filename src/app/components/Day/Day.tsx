'use client';

import clsx from 'clsx';
import React from 'react';

interface Props {
  isPadding: boolean;
  dateString: string;
  isToday: boolean;
  onDayClick: (dateString: string) => void;
  children: React.ReactNode;
}

function Day(props: Props) {
  const { isPadding, isToday, dateString, onDayClick, children } = props;

  return (
    <button
      className={clsx(
        'flex w-10 h-10 rounded-full justify-center items-center transition-colors ease-in duration-250',
        {
          'text-neutral-500': isPadding,
          'bg-blue-600': isToday,
          'hover:bg-neutral-400': !isToday,
        }
      )}
      onClick={() => onDayClick(dateString)}
    >
      {children}
    </button>
  );
}

export { Day };
