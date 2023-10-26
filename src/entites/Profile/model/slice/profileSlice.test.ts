import { Country } from "entites/Country"
import { ProfileSchema, ValidateProfileError } from "../types/profile"
import { profileActions, profileReducer } from "./profileSlice"
import { Currency } from "entites/Currency"
import { updateProfileData } from "../service/updateProfileData/updateProfileData"

describe('profileSlice.test', () => {

  const data = {
    username: 'Admin',
    age: 33,
    city: 'Krasnodar',
    country: Country.Russia,
    currency: Currency.RUB,
    first: 'Misha',
    lastname: 'Ledovskikh'
  }

  test('test set readonly', () => {
    const state: DeepPartial<ProfileSchema> = { readonly: false }
    expect(profileReducer(state as ProfileSchema, profileActions.setReadonly(true))).toEqual({readonly: true})
  })

  
  test('test cancel edit', () => {
    const state: DeepPartial<ProfileSchema> = { data, form: {username: '123'} }
    expect(profileReducer(state as ProfileSchema, profileActions.canselEdit())).toEqual({
      readonly: true,
      validateErrors: undefined,
      data,
      form: data
    })
  })

  test('test update data', () => {
    const state: DeepPartial<ProfileSchema> = { form: {username: '123'}}
    expect(profileReducer(state as ProfileSchema, profileActions.updateProfile({ username: 'admin111'}))).toEqual({      
      form: { username: 'admin111'}
    })
  })

  test('test update profile service pending', () => {
    const state: DeepPartial<ProfileSchema> = { 
      isLoading: false,
      validateErrors: [ValidateProfileError.SERVER_ERROR]
    }
    expect(profileReducer(state as ProfileSchema, updateProfileData.pending)).toEqual({      
      isLoading: true,
      validateErrors: undefined
    })
  })

  test('test update profile service fulfild', () => {
    const state: DeepPartial<ProfileSchema> = { 
      isLoading: true,
    }
    expect(profileReducer(state as ProfileSchema, updateProfileData.fulfilled(data, ''))).toEqual({      
      isLoading: false,
      validateErrors: undefined,
      readonly: true,     
      form: data,
      data: data,
      error: undefined 
    })
  })
  
})