import { createSlice } from '@reduxjs/toolkit';
import type { Listing } from '../types';

interface ListingState {
  listings: Listing[];
}

const initialState: ListingState = {
  listings: [],
};

export const listingsSlice = createSlice({
  name: 'compute',
  initialState,
  reducers: {},
});
