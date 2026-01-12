import { createSlice } from "@reduxjs/toolkit";
import { createApiThunkPrivate, createApiThunkPublic, createExtraReducersForThunk } from "../../utils/apiThunk";
import { sessionStorageRemoveItem } from "../../utils/GlobleFunction";
const initialState = {
    sendOtpData: {},
    verifyOtpData: {},
    userRegistrationData: {},
    getHomePageDataData: {},
    getAllOutletsData: {},
    getFoodItemsData: {},
    getUserInfoData: {}
}

//  https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd   real time coin market value

export const sendOtp = createApiThunkPublic('sendOtp', '/auth/user-send-otp', 'POST')
export const verifyOtp = createApiThunkPublic('verifyOtp', '/auth/user-verify-otp', 'POST')
export const userRegistration = createApiThunkPublic('userRegistration', '/auth/user-registration', 'POST')

export const getHomePageData = createApiThunkPrivate('getHomePageData', '/application-api/get-home-page-data', 'GET')


export const getAllOutlets = createApiThunkPrivate('getAllOutlets', '/application-api/get-all-outlets', 'GET')
export const getFoodItems = createApiThunkPrivate('getFoodItems', '/application-api/get-outlet-food-items', 'GET')

// user info
export const getUserInfo = createApiThunkPrivate('getUserInfo', '/application-api/get-user-details', 'GET')


export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: () => {
            sessionStorageRemoveItem()
            window.location.href = "/login"
        }
    },
    extraReducers: builder => {
        createExtraReducersForThunk(builder, sendOtp, 'sendOtpData')
        createExtraReducersForThunk(builder, verifyOtp, 'verifyOtpData')
        createExtraReducersForThunk(builder, userRegistration, 'userRegistrationData')
        
        createExtraReducersForThunk(builder, getHomePageData, 'getHomePageDataData')
        createExtraReducersForThunk(builder, getAllOutlets, 'getAllOutletsData')
        createExtraReducersForThunk(builder, getFoodItems, 'getFoodItemsData')
        
        createExtraReducersForThunk(builder, getUserInfo, 'getUserInfoData')
    }
})

export const { logout } = authSlice.actions;
export default authSlice.reducer