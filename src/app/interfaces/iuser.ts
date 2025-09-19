export interface IUser {
    uid:string;
    name:string;
    lastName:string;
    email:string;
    provider:string;
    photoURL:string;
    pathPhoto:string
    wallpapers: IWallpaper[]
}

interface IWallpaper{
    path:string,
    url:string
}
