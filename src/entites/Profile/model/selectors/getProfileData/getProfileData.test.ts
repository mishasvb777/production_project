import { StateSchema } from "app/providers/StoreProvider"
import { getProfileData } from "./getProfileData"
import { Country } from "entites/Country"
import { Currency } from "entites/Currency"


describe('getProfileData.test', () => {
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
        data: data
      }
    }
    expect(getProfileData(state as StateSchema)).toEqual(data)
  }), 
  test('should work with empty state', () => {
    const state = {}
    expect(getProfileData(state as StateSchema)).toEqual(undefined)
  })
})