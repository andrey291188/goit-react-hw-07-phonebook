import { createAsyncThunk } from "@reduxjs/toolkit";
import { deleteRequest, getRequest, postRequest } from "service/createResponse";


export const getPhoneBookThunk = createAsyncThunk("phonebook/get", async (_, {rejectWithValue}) => {
    try {
       const data = await getRequest()
    return data 
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

export const createPhoneBookThunk = createAsyncThunk("phonebook/create", async (data, { dispatch, rejectWithValue }) => {
    try {
        await postRequest(data);
        dispatch(getPhoneBookThunk());
        return data;
      } catch (error) {
        return rejectWithValue(error.message)
      }
      }
)

export const deletePhoneBookThunk = createAsyncThunk(
    "phonebook/delete",
    async (id, { dispatch, rejectWithValue }) => {
      try {
        await deleteRequest(id);
        dispatch(getPhoneBookThunk());
        return id;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );

