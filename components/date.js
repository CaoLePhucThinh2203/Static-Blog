import { parseISO, format } from 'date-fns';

export default function Date({ dateString }) {
  const date = parseISO(dateString);
  // parseISO('2020-01-01') → đối tượng Date JavaScript

  return (
    <time dateTime={dateString}>
      {format(date, 'LLLL d, yyyy')}
    </time>
  );
  // Render ra: <time datetime="2020-01-01">January 1, 2020</time>
}