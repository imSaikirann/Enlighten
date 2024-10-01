import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

//
interface DataState {
  items: any[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null; 
}


export const fetchData = createAsyncThunk(
  'data/fetchData',
  async () => {
    const response = await axios.get('/api/tags'); 
    return response.data;
  }
);


const dataSlice = createSlice({
  name: 'data',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  } as DataState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null; 
      });
  },
});


export default dataSlice.reducer;
