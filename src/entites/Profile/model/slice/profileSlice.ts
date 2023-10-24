import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Profile, ProfileSchema } from '../types/profile'
import { fetchProfileData } from '../service/fetchProfileData/fetchProfileData'

const initialState: ProfileSchema = {
  readonly: true,
  isLoading: false,
  error: undefined,
  data: undefined
}

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},   
  extraReducers: (builder) => { // редьюсеры для выполнения асинхронных операций
    builder
      .addCase(fetchProfileData.pending, (state, action) => { // состояние когда начал выполняться асинк экшен
        state.error = undefined;
        state.isLoading = true;       
      })        
      .addCase(fetchProfileData.fulfilled, (state, action: PayloadAction<Profile>) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchProfileData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload
      })        
  }, 
  },
)

export const { actions: profileActions } = profileSlice
export const { reducer: profileReducer } = profileSlice