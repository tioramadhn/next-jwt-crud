import userReducer from './features/openSlice'
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { studentApi } from './services/studentService'
import { userApi } from './services/userService'

export const store = configureStore({
    reducer: {
        user: userReducer,
        [studentApi.reducerPath]: studentApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(studentApi.middleware),
})

setupListeners(store.dispatch)