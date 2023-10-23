// файл для тестирования асинхронных функций
import { AsyncThunkAction } from "@reduxjs/toolkit";
import { StateSchema } from "app/providers/StoreProvider";

type ActionCreatorType<ReturnToType, Arg, RejectedValue> = (arg: Arg) => AsyncThunkAction<ReturnToType, Arg, {rejectValue: RejectedValue}> // - это тип который предстваляет из себя функцию, которая принимает какой то аргумент и возвращает thunk func action

export class TestAsyncThunk<Return, Arg, RejectedValue> { // Return - это тип который возвращает thunk, Arg - это аргумент, RejectedValue - то что возвращает thunk в случае ошибки
  dispatch: jest.MockedFn<any>;
  getState: () => StateSchema;
  actionCreator: ActionCreatorType<Return, Arg, RejectedValue>

  constructor(actionCreator: ActionCreatorType<Return, Arg, RejectedValue>) {
    this.actionCreator = actionCreator;
    this.dispatch = jest.fn()
    this.getState = jest.fn()
  }

  async callThunk(arg: Arg){
    const action = this.actionCreator(arg)
    const result = await action(this.dispatch, this.getState, undefined)  
    
    return result;
  }
}

