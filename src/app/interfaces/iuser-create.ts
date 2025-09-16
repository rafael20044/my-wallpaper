import { IUser } from "./iuser";

export interface IUserCreate extends Pick<IUser, 'email'>{
    password:string
}