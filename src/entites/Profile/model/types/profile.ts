import { Country } from "entites/Country";
import { Currency } from "entites/Currency";

export interface ProfileSchema { // как профиль у нас будет храниться в стейте
  data?: Profile;
  form?: Profile;
  isLoading: boolean;
  error?: string;
  readonly: boolean; // состояние которое будет определять доступен ли пользователь для редактирования 
}

export interface Profile { 
  first?: string,
  lastname?: string,
  age?: number,
  currency?: Currency,
  country?: Country,
  city?: string,
  username?: string,
  avatar?: string
}

