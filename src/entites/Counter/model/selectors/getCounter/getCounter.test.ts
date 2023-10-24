import { StateSchema } from "app/providers/StoreProvider"
import { getCounter } from "./getCounter"

describe('getCounter', () => {
  // У нас стейт может быть очень большим, и нам нужно проверить что наш sekctor возвращает именно то что нам нужно
  test('should return counter value', () => { // этот тест будет проверять что мы возвращаем тот участок стейта который мы ожидаем
    const state: DeepPartial<StateSchema> = { // аргуементом селектор, всегда принимает стейт, нам не надо объявлять весь глобальный 
      //стейтс со всеми полями которые там есть, мы возьмем что то конкретное, DeepPartial позволяет проигнорировать все поля, а взять только необходимые
      counter: {value: 10},
    } 
    expect(getCounter(state as StateSchema)).toEqual({ value: 10 }) // селектор, что мы ожидаем получить из стейта, так же необходимо указать что state приминять как StateSchema 
  }) 
})