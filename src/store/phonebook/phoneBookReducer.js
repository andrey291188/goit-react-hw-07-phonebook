import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { initialState } from './initialState';
import {
  createPhoneBookThunk,
  deletePhoneBookThunk,
  getPhoneBookThunk,
} from './thunkPhonebook';
import {
  handleFulfilled,
  handleFulfilledCreate,
  handleFulfilledDelete,
  handleFulfilledGet,
  handlePending,
  handleRejected,
} from './funcSupportSlice';

const phoneBookSlice = createSlice({
  name: 'phonebook',
  initialState: initialState.phonebook,
  extraReducers: builder => {
    builder
      .addCase(getPhoneBookThunk.fulfilled, handleFulfilledGet)
      .addCase(createPhoneBookThunk.fulfilled, handleFulfilledCreate)
      .addCase(deletePhoneBookThunk.fulfilled, handleFulfilledDelete)
      .addMatcher(
        isAnyOf(
          getPhoneBookThunk.pending,
          createPhoneBookThunk.pending,
          deletePhoneBookThunk.pending
        ),
        handlePending
      ).addMatcher(
        isAnyOf(
          getPhoneBookThunk.rejected,
          createPhoneBookThunk.rejected,
          deletePhoneBookThunk.rejected
        ),
        handleRejected
      ).addMatcher(
        isAnyOf(
          getPhoneBookThunk.fulfilled,
          createPhoneBookThunk.fulfilled,
          deletePhoneBookThunk.fulfilled
        ),
        handleFulfilled
      );
  },
});

const phoneBookReducer = phoneBookSlice.reducer
export default phoneBookReducer 
