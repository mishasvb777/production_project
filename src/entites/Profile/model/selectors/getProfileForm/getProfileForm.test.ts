import { StateSchema } from "app/providers/StoreProvider"
import { getProfileForm } from "./getProfileForm"
import { Country } from "entites/Country"
import { Currency } from "entites/Currency"


describe('getProfileForm.test', () => {
  test('', () => {    
    const data = {
      username: 'Admin',
      age: 33,
      city: 'Krasnodar',
      country: Country.Russia,
      currency: Currency.RUB,
      first: 'Misha',
      lastname: 'Ledovskikh'
    }
    const state: DeepPartial<StateSchema> = {
      profile: {
        form: data
      }
    }
    expect(getProfileForm(state as StateSchema)).toEqual(data)
  }), 
  test('should work with empty state', () => {
    const state = {}
    expect(getProfileForm(state as StateSchema)).toEqual(undefined)
  })
})