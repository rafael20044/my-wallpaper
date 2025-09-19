import { IUser } from "./iuser";

export interface IUserUpdate extends Omit<IUser, 'uid' | 'provider' | 'email'>{
    email?:string;
    password?:string
}
