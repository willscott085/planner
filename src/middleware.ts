import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

function createDateString(dateString?: string) {
  const isValidDateString = /^\d{4}(?:-|\/)\d{1,2}(?:-|\/)\d{1,2}$/.test(
    dateString!
  );
  const date =
    dateString && isValidDateString ? new Date(dateString) : new Date();
  let month = '' + (date.getMonth() + 1);
  let day = '' + date.getDate();
  let year = date.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
}

export function middleware(request: NextRequest) {
  try {
    const [_, date] = request.nextUrl.pathname.split('/planner/');
    const dateObj = new Date(date);

    if (!date || dateObj.toString() === 'Invalid Date') {
      return NextResponse.redirect(
        new URL(`/planner/${createDateString()}`, request.url)
      );
    }

    if (date !== createDateString(date)) {
      return NextResponse.redirect(
        new URL(`/planner/${createDateString(date)}`, request.url)
      );
    }
  } catch (e) {
    return NextResponse.redirect(new URL('/', request.url));
  }
}

export const config = {
  matcher: ['/planner/:path*', '/planner/:path+', '/planner/:path?'],
};
