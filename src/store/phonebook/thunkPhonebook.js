import { createAsyncThunk } from "@reduxjs/toolkit";
import { deleteRequest, getRequest, postRequest } from "service/createResponse";


export const getPhoneBookThunk = createAsyncThunk("phonebook/get", async (_, {rejectWithValue}) => {
    try {
       const data = await getRequest()
    return data 
    } catch (error) {
        console.log(error.message)
        return rejectWithValue(error.message)
    }
})

export const createPhoneBookThunk = createAsyncThunk("phonebook/create", async (data, { dispatch }) => {
    try {
        await postRequest(data);
        dispatch(getPhoneBookThunk());
        return data;
      } catch (error) {
        return error;
      }
})

export const deletePhoneBookThunk = createAsyncThunk(
    "phonebook/delete",
    async (id, { dispatch }) => {
      try {
        await deleteRequest(id);
        dispatch(getPhoneBookThunk());
        return id;
      } catch (error) {
        return error;
      }
    }
  );

