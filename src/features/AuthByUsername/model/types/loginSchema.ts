// описание стейта который отвечает за форму авторизации

export interface LoginSchema {
  username: string;
  password: string;
  isLoading: boolean; // нужно для того что бы когда нажимаем на кнопку Войти будет отправляться запрос, и время выполнения запроса будет обрабатывать
  error?: string;
}