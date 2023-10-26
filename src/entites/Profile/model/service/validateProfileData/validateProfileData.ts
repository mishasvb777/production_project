// есть два варианта реализовать валидацию, реализовать функцию которая принимает профиль аргументом, 
// можно сделать асинк фанк с помощью getState, возьмет этот профиль из стейта
// реализуем через функцию которая просто принимает аргумент, в данном примере простая валидация, которая проверят заполненое поле, и вводится ли число в поле возвраста:
import { Profile, ValidateProfileError } from '../../types/profile'

export const validateProfileData = (profile?: Profile) => {
   if(!profile){
    return [ValidateProfileError.NO_DATA]
   } 

  const {first, lastname, age, country} = profile;
  const errors: ValidateProfileError[] = []

  if(!first || !lastname) {
    errors.push(ValidateProfileError.INCORRECT_USER_DATA)
  } 

  if(!age || !Number.isInteger(age)){
    errors.push(ValidateProfileError.INCORRECT_AGE)
  }

  if(!country){
    errors.push(ValidateProfileError.INCORRECT_COUNTRY)
  }

  return errors;
}