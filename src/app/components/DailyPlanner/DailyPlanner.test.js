import { createMonthIterable } from '../components/Month/Month';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

describe('createMonthIterable', () => {
  test('given a month & year, returns a correct data structure', () => {
    const d = new Date(2023, 5, 15);
    const monthIterable = createMonthIterable(d.getFullYear(), d.getMonth());

    expect(monthIterable).toHaveLength(6);
    expect(monthIterable[0][0][0]).toBe(29);
    expect(monthIterable[0][0][1].isPadding).toBeTruthy();
    expect(monthIterable[2][6][1].isPadding).toBeFalsy();
    expect(monthIterable[2][6][1].isToday).toBeFalsy();
    expect(monthIterable[5][6][0]).toBe(9);
    expect(monthIterable[2][3][1].isToday).toBeTruthy();
  });
});
