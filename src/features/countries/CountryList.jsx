import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCountries } from './countrySlice';
import { fetchHolidays } from '../publicHolidays/holidaySlice';
import { nanoid } from '@reduxjs/toolkit';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const CountryList = ({ handleCountryCode }) => {
  const [countriesCode, setCountriesCode] = useState('');
  const [startDate, setStartDate] = useState(new Date());

  // const [addRequestStatus, setAddrequestStatus] = useState('idle');

  const canSubmit = [countriesCode, startDate].every(Boolean);

  useEffect(() => {
    if (fetchStatus === 'idle') {
      dispatch(fetchCountries());
    }
  }, []);

  const allCountries = useSelector((state) => state.country.countries);

  const fetchStatus = useSelector((state) => state.country.status);

  const dispatch = useDispatch();

  const showCountriesList = allCountries.map((country) => (
    <option key={nanoid()} value={country.countryCode}>
      {country.name}
    </option>
  ));

  const handleSelect = (event) => {
    setCountriesCode(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const info = {
      year: startDate.getFullYear(),
      countryCode: countriesCode,
    };

    try {
      if (canSubmit) {
        dispatch(fetchHolidays(info)).unwrap();
        handleCountryCode(info.countryCode);
        setCountriesCode('');
      }
    } catch (error) {
      return error.message;
    }
    // addRequestStatus('pending');
  };

  return (
    <>
      {!canSubmit ? <p>Please fill all the field</p> : ''}

      <form onSubmit={handleSubmit}>
        <label htmlFor="country-select">Choose a country from the list:</label>
        <select
          name="country"
          id="country-select"
          value={countriesCode}
          onChange={handleSelect}
        >
          <option>--Please select from list--</option>
          {showCountriesList}
        </select>

        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          showYearPicker
          dateFormat="yyyy"
          yearItemNumber={9}
        />

        <button>Submit</button>
      </form>
    </>
  );
};

export default CountryList;
