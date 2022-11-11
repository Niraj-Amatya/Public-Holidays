import React, { useState } from 'react';
import './App.css';
import CountryList from './features/countries/CountryList';
import ShowHolidays from './features/publicHolidays/ShowHolidays';

const App = () => {
  const [countryCodeSelected, setCountryCodeSelected] = useState('');

  console.log(countryCodeSelected);

  const handleCountryCode = (code) => {
    setCountryCodeSelected(code);
  };

  return (
    <>
      <CountryList handleCountryCode={handleCountryCode} />
      <ShowHolidays countryCode={countryCodeSelected} />
    </>
  );
};

export default App;
