import React from 'react';
import { useSelector } from 'react-redux';
import Holiday from './Holiday';
import { nanoid } from '@reduxjs/toolkit';
import './showHolidays.css';

const ShowHolidays = ({ countryCode }) => {
  const allHolidays = useSelector((state) => state.holidays.holidays);

  const holidayStatus = useSelector((state) => state.holidays.status);

  const error = useSelector((state) => state.holidays.error);

  const countryList = useSelector((state) => state.country.countries);

  const countrySelected = countryList.find(
    (country) => country.countryCode === countryCode
  );

  if (!countrySelected) {
    return;
  }

  console.log(countrySelected.name);

  let output;

  if (holidayStatus === 'loading') {
    output = <p>Loading..</p>;
  } else if (holidayStatus === 'successed') {
    output = allHolidays.map((holiday) => (
      <Holiday
        key={nanoid()}
        holidayName={holiday.name}
        date={holiday.date}
        localName={holiday.localName}
      />
    ));
  } else if (holidayStatus === 'failed') {
    content = <p>{error}</p>;
  }

  return (
    <>
      <h1> {countrySelected.name}</h1>

      <div className="holidays">{output}</div>
    </>
  );
};

export default ShowHolidays;
