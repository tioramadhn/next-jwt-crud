import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: {},
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state) => {
            state.value = state.value
        },
    },
})

// Action creators are generated for each case reducer function
export const { setUser } = userSlice.actions

export default userSlice.reducer