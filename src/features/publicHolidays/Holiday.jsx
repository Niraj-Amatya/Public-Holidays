import React from 'react';
import './holiday.css';
import { format } from 'date-fns';
import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict';
const Holiday = ({ holidayName, date, localName }) => {
  const day = format(new Date(date), 'cccc - dd LLL yyyy');
  const daysLeftFromToday = formatDistanceToNowStrict(new Date(date), {
    unit: 'day',
    addSuffix: true,
  });
  return (
    <>
      <div className="card">
        <h3>{holidayName}</h3>
        <p>{day}</p>
        <p>{daysLeftFromToday}</p>
        <p>{localName}</p>
      </div>
    </>
  );
};

export default Holiday;
