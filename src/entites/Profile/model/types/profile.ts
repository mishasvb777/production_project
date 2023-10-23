import { Country, Currency } from "shared/const/commons";

export interface Profile { 
  first: string,
  lastname: string,
  age: number,
  currency: Currency,
  country: Country,
  city: string,
  username: string,
  avatar: string
}

export interface ProfileSchema { // как профиль у нас будет храниться в стейте
  data?: Profile;
  isLoading: boolean;
  error?: string;
  readonly: boolean; // состояние которое будет определять доступен ли пользователь для редактирования 
}