// файл для тестирования асинхронных функций
import { AsyncThunkAction } from "@reduxjs/toolkit";
import { StateSchema } from "app/providers/StoreProvider";
import axios, { AxiosStatic } from "axios";

type ActionCreatorType<ReturnToType, Arg, RejectedValue> = (arg: Arg) => AsyncThunkAction<ReturnToType, Arg, {rejectValue: RejectedValue}> // - это тип который предстваляет из себя функцию, которая принимает какой то аргумент и возвращает thunk func action

jest.mock('axios')

const mockedAxios = jest.mocked(axios)


export class TestAsyncThunk<Return, Arg, RejectedValue> { // Return - это тип который возвращает thunk, Arg - это аргумент, RejectedValue - то что возвращает thunk в случае ошибки
  dispatch: jest.MockedFn<any>;

  getState: () => StateSchema;

  actionCreator: ActionCreatorType<Return, Arg, RejectedValue>

  api: jest.MockedFunctionDeep<AxiosStatic> | undefined;
  navigate: jest.MockedFn<any> | undefined

  constructor(actionCreator: ActionCreatorType<Return, Arg, RejectedValue>, state?: DeepPartial<StateSchema>) {
    this.actionCreator = actionCreator;
    this.dispatch = jest.fn()
    this.getState = jest.fn(() => state as StateSchema)

    this.api = mockedAxios;
    this.navigate = jest.fn();
  }

  async callThunk(arg: Arg){
    const action = this.actionCreator(arg)
    const result = await action(this.dispatch, this.getState, {api: this.api, navigate: this.navigate })  
    
    return result;
  }
}

