import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: true,
}

export const modeSlice = createSlice({
  name: 'mode',
  initialState,
  reducers: {
    toggleMode: (state) => {
      state.value = !state.value
    },
  },
})

// Action creators are generated for each case reducer function
export const { toggleMode } = modeSlice.actions

export default modeSlice.reducer