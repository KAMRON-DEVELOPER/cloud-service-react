import { createSlice } from '@reduxjs/toolkit';
import type { Project } from '../types';

interface computeState {
  projects: Project[];
}

const initialState: computeState = {
  projects: [],
};

export const computeSlice = createSlice({
  name: 'compute',
  initialState,
  reducers: {},
});
