import {IBasket} from "./Basket";

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

export interface IUser {
  id?: string;
  email: string;
  login: string;
  role?: string;
  isAdmin?: boolean;
  products: IBasket[];
}
