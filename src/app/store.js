import { configureStore } from '@reduxjs/toolkit';
import countryReducer from '../features/countries/countrySlice';
import holidayReducer from '../features/publicHolidays/holidaySlice';

export const store = configureStore({
  reducer: { country: countryReducer, holidays: holidayReducer },
});
