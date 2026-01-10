import { configureStore } from '@reduxjs/toolkit';
import AuthSlice from "./slices/AuthSlice"
import CoinTransactionSlice from "./slices/CoinTransactionSlice"

export const store = configureStore({
  reducer: {
    auth: AuthSlice,
    coinTransaction: CoinTransactionSlice,
  },
});