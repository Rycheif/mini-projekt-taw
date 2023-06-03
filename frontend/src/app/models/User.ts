export interface ICreateOrUpdateUser {
  id?: number;
  email: string;
  login: string;
  password: string;
  reEnteredPassword: string;
}

export interface IAuthUser {
  loginOrEmail: string;
  password: string;
}
