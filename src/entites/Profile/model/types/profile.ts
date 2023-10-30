import { Country } from "entites/Country";
import { Currency } from "entites/Currency";

export enum ValidateProfileError { // типы валидационных ошибок
  INCORRECT_USER_DATA = 'INCORRECT_USER_DATA',
  INCORRECT_AGE = 'INCORRECT_AGE',
  INCORRECT_COUNTRY = 'INCORRECT_COUNTRY',
  NO_DATA = 'NO_DATA',
  // так же можем сюда добавлять разные ошибки, и которые со стороны серверва прилетают тоже
  SERVER_ERROR = 'SERVER_ERROR'
}

export interface ProfileSchema { // как профиль у нас будет храниться в стейте
  data?: Profile;
  form?: Profile;
  isLoading: boolean;
  error?: string;
  readonly: boolean; // состояние которое будет определять доступен ли пользователь для редактирования 
  validateErrors?: ValidateProfileError[]
}

export interface Profile { 
  id?: string
  first?: string,
  lastname?: string,
  age?: number,
  currency?: Currency,
  country?: Country,
  city?: string,
  username?: string,
  avatar?: string, 
}



