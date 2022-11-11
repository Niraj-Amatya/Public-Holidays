import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const URL = 'https://date.nager.at/api/v3/AvailableCountries';

const initialState = {
  countries: [],
  status: 'idle',
  error: null,
};

export const fetchCountries = createAsyncThunk(
  'countries/fetchCountries',
  async () => {
    try {
      const response = await axios.get(URL);

      const data = response.data;
      return data;
    } catch (error) {
      console.log(error.message);
    }
  }
);

const countrySlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCountries.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.countries = action.payload;
    });
  },
});

export default countrySlice.reducer;
