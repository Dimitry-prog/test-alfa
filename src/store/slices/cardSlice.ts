import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice, PayloadAction,
} from "@reduxjs/toolkit";
import { CardResponseServer, ICard } from "../../types/cardTypes";
import axios, { AxiosError } from "axios";

type CardState = {
  cards: ICard[];
  isLoading: boolean;
  error: string | null | unknown;
};

type KnownError = {
  message: string;
};

const initialState: CardState = {
  cards: JSON.parse(localStorage.getItem("cards") ?? "[]"),
  isLoading: false,
  error: null,
};

export const getCards = createAsyncThunk<CardResponseServer[],
  undefined,
  { rejectValue: string }>("card/getCards", async (_, {rejectWithValue}) => {
  try {
    const {data} = await axios(
      "https://api.unsplash.com/photos?client_id=BeaHBxv90DkOKzHsa709D04BcDGP7esw9wZdKYpfHVc&count=30"
    );

    return data;
  } catch (e) {
    const error = e as AxiosError<KnownError>;
    if (!error.response) {
      throw e;
    }
    return rejectWithValue(error.response.data.message);
  }
});

const cardSlice = createSlice({
  name: "card",
  initialState,
  reducers: {
    deleteCard: (state, action: PayloadAction<string>) => {
      state.cards = state.cards.filter((card) => card.id !== action.payload);
      localStorage.setItem("cards", JSON.stringify(state.cards));
    },
    toggleLikeCard: (state, action: PayloadAction<string>) => {
      state.cards = state.cards.map(card => {
        if (card.id === action.payload) {
          card.isLike = !card.isLike;
        }
        return card;
      });
      localStorage.setItem("cards", JSON.stringify(state.cards));
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<CardState>) => {
    builder
      .addCase(getCards.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCards.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.cards = action.payload.map(({id, urls, alt_description}) => ({
          id,
          imgUrl: urls.thumb,
          description: alt_description,
          isLike: false,
        }));
        localStorage.setItem("cards", JSON.stringify(state.cards));
      })
      .addCase(getCards.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const {deleteCard, toggleLikeCard} = cardSlice.actions;

export default cardSlice.reducer;
