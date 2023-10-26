import { StateSchema } from "app/providers/StoreProvider"
import { getProfilesLoading } from "./getProfilesLoading"
import { Country } from "entites/Country"
import { Currency } from "entites/Currency"


describe('getProfileForm.test', () => {
  test('', () => {        
    const state: DeepPartial<StateSchema> = {
      profile: {
        isLoading: true
      }
    }
    expect(getProfilesLoading(state as StateSchema)).toEqual(true)
  }), 
  test('should work with empty state', () => {
    const state = {}
    expect(getProfilesLoading(state as StateSchema)).toEqual(undefined)
  })
})