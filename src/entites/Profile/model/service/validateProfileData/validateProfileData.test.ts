import axios from 'axios';
import { validateProfileData } from './validateProfileData';
import { TestAsyncThunk } from 'shared/lib/tests/testAsyncThunk/TestAsyncThunk';
import { Country } from 'entites/Country';
import { Currency } from 'entites/Currency';
import { ValidateProfileError } from '../../types/profile';


// в тестах любые запросы на сервер нужно мокать
jest.mock('axios')

const mockedAxios = jest.mocked(axios) //необходимо для глубокого моканья

const data = {
  username: 'Admin',
  age: 33,
  city: 'Krasnodar',
  country: Country.Russia,
  currency: Currency.RUB,
  first: 'Misha',
  lastname: 'Ledovskikh'
}

describe('validateProfileData.test', () => { 
  test('succes', async () => {     
    const result = validateProfileData(data) 
    
    expect(result).toEqual([])
  })

  test('without first and last name', async () => {    

    const result = validateProfileData({... data, first: '', lastname: ''}) 
    
    expect(result).toEqual([
      ValidateProfileError.INCORRECT_USER_DATA
    ])
  })

  test('incorrect age', async () => {    
    const result = validateProfileData({... data, age: undefined}) 
    
    expect(result).toEqual([
      ValidateProfileError.INCORRECT_AGE
    ])
  })

  test('incorrect country', async () => {    
    const result = validateProfileData({... data, country: undefined}) 
    
    expect(result).toEqual([
      ValidateProfileError.INCORRECT_COUNTRY
    ])
  })

  test('incorrect all', async () => {    
    const result = validateProfileData({}) 
    
    expect(result).toEqual([
      ValidateProfileError.INCORRECT_USER_DATA, 
      ValidateProfileError.INCORRECT_AGE,           
      ValidateProfileError.INCORRECT_COUNTRY
    ])
  })
})