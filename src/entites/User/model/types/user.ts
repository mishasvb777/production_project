export interface User { // описываем тип который нам будет возвращать бекэнд
  id: string,
  username: string
}

export interface UserSchema {
  authData?: User; // это сам пользователь, если здесь undefined то пользователь не авторизован
}