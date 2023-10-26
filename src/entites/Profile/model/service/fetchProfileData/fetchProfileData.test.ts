import axios from 'axios';
import { fetchProfileData } from './fetchProfileData';
import { TestAsyncThunk } from 'shared/lib/tests/testAsyncThunk/TestAsyncThunk';
import { Country } from 'entites/Country';
import { Currency } from 'entites/Currency';


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

describe('fetchProfileData.test', () => { 
  test('succes', async () => {  
    const thunk = new TestAsyncThunk(fetchProfileData)
    thunk.api?.get.mockReturnValue(Promise.resolve({ data })) 

    const result = await thunk.callThunk()  
    
    expect(mockedAxios.get).toHaveBeenCalled(); // проверяем что метод POST был отправлен 
    expect(result.meta.requestStatus).toBe('fulfilled'); // проверяем что наш запрос успешно выполнился 
    expect(result.payload).toEqual(data)
  })

  test('error', async () => {    

    const thunk = new TestAsyncThunk(fetchProfileData)
    thunk.api?.get.mockReturnValue(Promise.resolve({ status: 403 })); // здесь проверям когда запрос выполнился с ошибкой, диспатч у нас отработать не должен
    const result = await thunk.callThunk()   

    expect(mockedAxios.get).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('rejected');
  })
})