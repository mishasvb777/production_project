import { StateSchema } from "app/providers/StoreProvider"
import { getProfileReadonly } from "./getProfileReadonly"
import { Country } from "entites/Country"
import { Currency } from "entites/Currency"


describe('getProfileForm.test', () => {
  test('', () => {        
    const state: DeepPartial<StateSchema> = {
      profile: {
        readonly: true
      }
    }
    expect(getProfileReadonly(state as StateSchema)).toEqual(true)
  }), 
  test('should work with empty state', () => {
    const state = {}
    expect(getProfileReadonly(state as StateSchema)).toEqual(undefined)
  })
})