import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { hotel } from "../api/index";

const {
  getHotelsByOwner,
  createHotel,
  deleteHotel,
  updateHotel,
  getHotelById,
  getAllHotels,
} = hotel;

const initialState = {};

export const getHotelsByOwnerAsync = createAsyncThunk(
  "hotel/getHotelsByOwner",
  async (id) => {
    const response = await getHotelsByOwner(id);
    return response.data;
  }
);
export const getAllHotelsAsync = createAsyncThunk(
  "hotel/getAllHotels",
  async () => {
    const response = await getAllHotels();
    return response.data;
  }
);
export const getHotelByIdAsync = createAsyncThunk(
  "hotel/getHotelsById",
  async (id) => {
    const response = await getHotelById(id);
    return response.data;
  }
);

export const createHotelAsync = createAsyncThunk(
  "hotel/create",
  async ({ hotel, id }) => {
    const response = await createHotel(hotel, id);
    return response;
  }
);

export const deleteHotelAsync = createAsyncThunk("hotel/delete", async (id) => {
  const response = await deleteHotel(id);
  return response;
});

export const updateHotelAsync = createAsyncThunk(
  "hotel/update",
  async (hotel) => {
    const response = await updateHotel(hotel);
    return response;
  }
);

export const hotelSlice = createSlice({
  name: "hotel",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getHotelsByOwnerAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(getHotelsByOwnerAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.myhotels = action.payload;
      })
      .addCase(createHotelAsync.fulfilled, (state, action) => {
        state.created = action.payload;
      })
      .addCase(deleteHotelAsync.fulfilled, (state, action) => {
        state.deleted = action.payload;
      })
      .addCase(getAllHotelsAsync.fulfilled, (state, action) => {
        state.hotels = action.payload;
      })
      .addCase(getHotelByIdAsync.fulfilled, (state, action) => {
        state.hotelSelected = action.payload;
      });
  },
});

export const myHotelsOwner = (state) => state.hotel.myhotels;
export const hotelSelected = (state) => state.hotel.hotelSelected;
export const allHotels = (state) => state.hotel.hotels;

export default hotelSlice.reducer;
