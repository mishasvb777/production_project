import { User } from "entites/User";

export interface Comment {
  id: string;
  user: User;
  body: string;
}

