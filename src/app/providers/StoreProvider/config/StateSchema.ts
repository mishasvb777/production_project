// описания схемы для ОБЩЕГО стора

import  { CounterSchema }  from "entites/Counter/indext";
import { UserSchema } from "entites/User";


export interface StateSchema {
  counter: CounterSchema;
  user: UserSchema;
}