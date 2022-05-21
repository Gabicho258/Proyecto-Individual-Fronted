import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { comment } from "../api/index";

const { createComment, getCommentsByHotel } = comment;

const initialState = {};

export const getCommentsByHotelAsync = createAsyncThunk(
  "comment/getCommentsByHotel",
  async (id) => {
    const response = await getCommentsByHotel(id);
    return response.data;
  }
);

export const createCommentAsync = createAsyncThunk(
  "comment/create",
  async ({ comment, id }) => {
    const response = await createComment(comment, id);
    return response;
  }
);

export const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(getCommentsByHotelAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.hotelComments = action.payload;
      })
      .addCase(createCommentAsync.fulfilled, (state, action) => {
        state.created = action.payload;
      });
  },
});

export const hotelComments = (state) => state.comment.hotelComments;

export default commentSlice.reducer;
