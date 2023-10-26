import axios from 'axios';
import { updateProfileData } from './updateProfileData';
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

describe('updateProfileData.test', () => { 
  test('succes', async () => {  
    const thunk = new TestAsyncThunk(updateProfileData, {
      profile: {
        form: data
      }
    })

    thunk.api?.put.mockReturnValue(Promise.resolve({ data })) 

    const result = await thunk.callThunk()  
    
    expect(mockedAxios.put).toHaveBeenCalled(); // проверяем что метод put был отправлен 
    expect(result.meta.requestStatus).toBe('fulfilled'); // проверяем что наш запрос успешно выполнился 
    expect(result.payload).toEqual(data)
  })

  test('error', async () => {    

    const thunk = new TestAsyncThunk(updateProfileData, {
      profile: {
          form: data,
      },
  });
    thunk.api?.put.mockReturnValue(Promise.resolve({ status: 403 })); // здесь проверям когда запрос выполнился с ошибкой, диспатч у нас отработать не должен
    const result = await thunk.callThunk()   

    expect(result.meta.requestStatus).toBe('rejected');
    expect(result.payload).toEqual([ValidateProfileError.SERVER_ERROR])
  })

  test('validate error', async () => {    

    const thunk = new TestAsyncThunk(updateProfileData, {
      profile: {
        form: {...data, lastname: ''}
      }
    })
    const result = await thunk.callThunk()   

    expect(result.meta.requestStatus).toBe('rejected');
    expect(result.payload).toEqual([ValidateProfileError.INCORRECT_USER_DATA])
  })
})