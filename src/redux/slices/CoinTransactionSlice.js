import { createSlice } from "@reduxjs/toolkit";
import { createApiThunkPublic, createExtraReducersForThunk } from "../../utils/apiThunk";
const initialState = {
    sendCoinData: {},
    getAllTransactionListData: {},
}


export const sendCoin = createApiThunkPublic('sendCoin', 'transaction/sendCoin', 'POST')
export const getAllTransactionList = createApiThunkPublic('getAllTransactionList', 'transaction/getAllTransactionList', 'POST')

export const CoinTransactionSlice = createSlice({
    name: 'CoinTransaction',
    initialState,
    extraReducers: builder => {
        createExtraReducersForThunk(builder, sendCoin, 'sendCoinData')
         createExtraReducersForThunk(builder, getAllTransactionList, 'getAllTransactionListData')
    }
})

export default CoinTransactionSlice.reducer