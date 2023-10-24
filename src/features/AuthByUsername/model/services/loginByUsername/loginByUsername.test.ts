import axios from 'axios';
import { loginByUsername } from './loginByUsername';
import { userActions } from 'entites/User';
import { TestAsyncThunk } from 'shared/lib/tests/testAsyncThunk/TestAsyncThunk';


// в тестах любые запросы на сервер нужно мокать
jest.mock('axios')

const mockedAxios = jest.mocked(axios) //необходимо для глубокого моканья


describe('LoginByUsername', () => {
  // const userValue = {username: 'name', id: '1'}
  // let dispatch: Dispatch;
  // let getState: () => StateSchema;

  // beforeEach(() => {
  //   dispatch = jest.fn()
  //   getState = jest.fn()
  // })

  // test('succes login', async () => {
  //   mockedAxios.post.mockReturnValue(Promise.resolve({ data:userValue }));
  //   const action = loginByUsername({username: '123', password: '123'})
  //   const result = await action(dispatch, getState, undefined)    
  //   // result нам вернет объект в котором будет  type, username, id, и тд
  //   expect(dispatch).toHaveBeenCalledWith(userActions.setAuthData(userValue)) // проверям что наш диспатч вообще вызвался, и вызвался с нужными данными, в данном случае userValue
  //   expect(dispatch).toHaveBeenCalledTimes(3) // проверяем что диспатч у нас вызвался три раза
  //   expect(mockedAxios.post).toHaveBeenCalled(); // проверяем что метод POST был отправлен 
  //   expect(result.meta.requestStatus).toBe('fulfilled'); // проверяем что наш запрос успешно выполнился 
  //   expect(result.payload).toEqual(userValue)
  // })

  // test('error login', async () => {
  //   mockedAxios.post.mockReturnValue(Promise.resolve({ status: 403 })); // здесь проверям когда запрос выполнился с ошибкой, диспатч у нас отработать не должен
  //   const action = loginByUsername({username: '123', password: '123'})
  //   const result = await action(dispatch, getState, undefined)
  //   // result нам вернет объект в котором будет  type, username, id, и тд
  //   expect(dispatch).toHaveBeenCalledTimes(2) // проверяем что диспатч у нас вызвался 2 раза
  //   expect(mockedAxios.post).toHaveBeenCalled(); // проверяем что метод POST был отправлен 
  //   expect(result.meta.requestStatus).toBe('rejected'); // при ошибки в запросе статус у нас будет rejected
  //   expect(result.payload).toEqual('error')
  // })

  test('succes login', async () => {
    const userValue = {username: 'name', id: '1'}

    const thunk = new TestAsyncThunk(loginByUsername)
    thunk.api?.post.mockReturnValue(Promise.resolve({data: userValue})) 
    const result = await thunk.callThunk({username: '123', password: '123'})  // result нам вернет объект в котором будет  type, username, id, и тд    

    
    expect(thunk.dispatch).toHaveBeenCalledWith(userActions.setAuthData(userValue)) // проверям что наш диспатч вообще вызвался, и вызвался с нужными данными, в данном случае userValue
    expect(thunk.dispatch).toHaveBeenCalledTimes(3) // проверяем что диспатч у нас вызвался три раза
    expect(mockedAxios.post).toHaveBeenCalled(); // проверяем что метод POST был отправлен 
    expect(result.meta.requestStatus).toBe('fulfilled'); // проверяем что наш запрос успешно выполнился 
    expect(result.payload).toEqual(userValue)
  })

  test('error login', async () => {    

    const thunk = new TestAsyncThunk(loginByUsername)
    thunk.api?.post.mockReturnValue(Promise.resolve({ status: 403 })); // здесь проверям когда запрос выполнился с ошибкой, диспатч у нас отработать не должен
    const result = await thunk.callThunk({username: '123', password: '123'})    // result нам вернет объект в котором будет  type, username, id, и тд
   
    expect(thunk.dispatch).toHaveBeenCalledTimes(2) // проверяем что диспатч у нас вызвался 2 раза
    expect(thunk.api?.post).toHaveBeenCalled(); // проверяем что метод POST был отправлен 
    expect(result.meta.requestStatus).toBe('rejected'); // при ошибки в запросе статус у нас будет rejected
    expect(result.payload).toEqual('error')
  })
})