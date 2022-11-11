import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  holidays: [],
  status: 'idle',
  error: null,
};

export const fetchHolidays = createAsyncThunk(
  'holidays/fetchHolidays',
  async (info) => {
    console.log(info);
    const { year, countryCode } = info;
    try {
      const response = await axios.get(
        `https://date.nager.at/api/v3/PublicHolidays/${year}/${countryCode}`
      );
      return response.data;
    } catch (error) {
      console.log(error.message);
    }
  }
);

const holidaySlice = createSlice({
  name: 'holidays',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHolidays.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchHolidays.fulfilled, (state, action) => {
        state.status = 'successed';
        state.holidays = action.payload;
      })
      .addCase(fetchHolidays.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default holidaySlice.reducer;
