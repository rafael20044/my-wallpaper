import { IUser } from "./iuser";

export interface IUserAuth extends Pick<IUser, 'uid'>{
    isInitProfile:boolean;
    isInitHome:boolean;
    isInitConfi:boolean;
}