'use client';

import clsx from 'clsx';
import React from 'react';

interface Props {
  isPadding: boolean;
  dateString: string;
  isToday: boolean;
  isSelected: boolean;
  onDayClick: (dateString: string) => void;
  children: React.ReactNode;
}

function Day(props: Props) {
  const { isPadding, isToday, isSelected, dateString, onDayClick, children } =
    props;

  return (
    <button
      className={clsx(
        'flex rounded-full justify-center items-center transition-colors ease-in duration-250 aspect-square hover:shadow-2',
        {
          'text-neutral-500': isPadding,
          'bg-blue-600': isToday,
          'bg-neutral-400': isSelected && !isToday,
        }
      )}
      onClick={() => onDayClick(dateString)}
    >
      {children}
    </button>
  );
}

export { Day };
