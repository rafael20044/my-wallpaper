import { IUser } from "./iuser";

export interface IUserAuth extends Pick<IUser, 'uid'>{
    isInit:boolean;
}