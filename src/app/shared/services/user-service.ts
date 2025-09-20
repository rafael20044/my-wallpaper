import { Injectable } from '@angular/core';
import {
  createUserWithEmailAndPassword,
  getAuth, GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  signOut,
  User,
  updatePassword,
  updateEmail,
  user,
} from '@angular/fire/auth';
import { app } from 'src/app/core/config/firebase.confi';
import { ToastService } from './toast-service';
import { Const } from 'src/app/const/const';
import { FireStoreService } from './fire-store-service';
import { IUser } from 'src/app/interfaces/iuser';
import { LocalStorageService } from './local-storage-service';
import { Router } from '@angular/router';
import { IUserAuth } from 'src/app/interfaces/iuser-auth';
import { IUserUpdate } from 'src/app/interfaces/iuser-update';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private auth = getAuth(app);

  constructor(
    private readonly toastService: ToastService,
    private readonly databaseService: FireStoreService,
    private readonly localStorageService: LocalStorageService,
    private readonly router: Router,
  ) { }

  async createUserEmailAndPassword(email: string, password: string) {
    try {
      const response = await createUserWithEmailAndPassword(this.auth, email, password);
      return response.user.uid;
    } catch (error) {
      this.toastService.presentToast('email already exists', 'top', 'danger');
      return;
    }
  }

  async loginWithEmailAndPassword(email: string, password: string) {
    try {
      const result = await signInWithEmailAndPassword(this.auth, email, password);
      return result.user;
    } catch (error) {
      this.toastService.presentToast('Incorrect password or email', 'top', 'danger');
      return;
    }
  }

  async registerWithGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(this.auth, provider);
      const user = result.user;
      if (user) {
        const data = await this.databaseService.findUserByUid(user.uid);
        if (!data) {
          this.saveData(user);
        }
        const userAuth: IUserAuth = {
          uid: user.uid,
          isInitProfile: true,
          isInitConfi: true,
          isInitHome: true,
        };
        this.localStorageService.set(Const.USER_AUTH, userAuth);
        this.router.navigate(['/tab/home']);
      }
    } catch (error) {
      console.log(error);
      return;
    }
  }

  async mySingOut() {
    signOut(this.auth)
  }

  async update(data: IUserUpdate) {
    const user = this.getUser();
    user.subscribe({
      next: (value) => {
        if (value) {
          this.updateDB(value.uid, data);
        }
      },
      error: (err) => console.log(err)
    });
  }

  private getUser() {
    return user(this.auth);
  }

  private async updateDB(uid: string, data: IUserUpdate) {
    await this.databaseService.updateData(uid, data);
  }

  private saveData(user: User) {
    const nameArray = user.displayName?.split(' ');
    if (nameArray && user.email) {
      const data: IUser = {
        name: nameArray[0],
        lastName: nameArray[1],
        email: user.email,
        uid: user.uid,
        provider: 'google',
        photoURL: user.photoURL || '',
        wallpapers: [],
        pathPhoto: user.photoURL || ''
      };
      this.databaseService.setData(Const.USER_COLLECTION, data);
    }
  }


}
