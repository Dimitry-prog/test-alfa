import { ActionReducerMapBuilder, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CardResponseServer, ICard } from "../../types/cardTypes";
import axios, { AxiosError } from "axios";

type CardState = {
  cards: ICard[];
  isLoading: boolean;
  error: string | null | unknown;
}

type KnownError = {
  message: string;
};

const initialState: CardState = {
  cards: [],
  isLoading: false,
  error: null,
}

export const getCards = createAsyncThunk<CardResponseServer[], undefined, { rejectValue: string }>(
  'card/getCards',
  async (_, {rejectWithValue}) => {
    try {
      const {data} = await axios('https://api.unsplash.com/photos?client_id=BeaHBxv90DkOKzHsa709D04BcDGP7esw9wZdKYpfHVc&count=30');

      return data;
    } catch (e) {
      const error = e as AxiosError<KnownError>
      if (!error.response) {
        throw e;
      }
      return rejectWithValue(error.response.data.message);
    }
  }
)


const cardSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<CardState>) => {
    builder
      .addCase(getCards.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCards.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.cards = action.payload.map(({id, urls, alt_description}) => (
          {id, imgUrl: urls.thumb, description: alt_description}
        ));
      })
      .addCase(getCards.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default cardSlice.reducer;