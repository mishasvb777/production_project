// здесь находится инстанс axios 

import axios from "axios";
import { USER_LOCALSTORAGE_KEY } from "shared/const/localstorage";

// если мы сейчас находимся в DEV режиме то у нас будет http://localhost:8000, если продакшен режим то будет например реальный адрес сервера http://production.ru
//const baseUrl = __IS_DEV__ ? 'http://localhost:8000' : 'http://production.ru'

export const $api = axios.create({
  baseURL: __API__,
  headers: {    
    authorization: localStorage.getItem(USER_LOCALSTORAGE_KEY) || '', // при каждом запросе мы в хедере будем отправлять наш токен    
  }
})