// описания схемы для ОБЩЕГО стора

import  { CounterSchema }  from "entites/Counter/indext";
import { UserSchema } from "entites/User";
import { LoginSchema } from "features/AuthByUsername";


export interface StateSchema {
  counter: CounterSchema;
  user: UserSchema;
  loginForm: LoginSchema;
}