import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Profile, ProfileSchema } from '../types/profile'
import { fetchProfileData } from '../service/fetchProfileData/fetchProfileData'
import { updateProfileData } from '../service/updateProfileData/updateProfileData'

const initialState: ProfileSchema = {
  readonly: true,
  isLoading: false,
  error: undefined,
  data: undefined
}

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setReadonly: (state, action: PayloadAction<boolean>) => {
      state.readonly = action.payload
    },
    canselEdit: (state) => {
      state.readonly = true
      state.form = state.data
    },
    updateProfile: (state, action: PayloadAction<Profile>) => {
      state.form = {
        ...state.form,
        ...action.payload
      }
    }    
  },   
  extraReducers: (builder) => { // редьюсеры для выполнения асинхронных операций
    builder
      //extraRedusers для получения данных профиля с сервера
      .addCase(fetchProfileData.pending, (state, action) => { // состояние когда начал выполняться асинк экшен
        state.error = undefined;
        state.isLoading = true;       
      })        
      .addCase(fetchProfileData.fulfilled, (state, action: PayloadAction<Profile>) => {
        state.isLoading = false;
        state.data = action.payload;
        state.form = action.payload;
      })
      .addCase(fetchProfileData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload
      })

      //extraRedusers для обновления данных профиля на сервере
      .addCase(updateProfileData.pending, (state, action) => { // состояние когда начал выполняться асинк экшен
        state.error = undefined;
        state.isLoading = true;       
      })        
      .addCase(updateProfileData.fulfilled, (state, action: PayloadAction<Profile>) => {
        state.isLoading = false;
        state.data = action.payload;
        state.form = action.payload;
        state.readonly = true;
      })
      .addCase(updateProfileData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload
      })          
  }, 
  },
)

export const { actions: profileActions } = profileSlice
export const { reducer: profileReducer } = profileSlice