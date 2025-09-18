import { Injectable } from '@angular/core';
import {
  createUserWithEmailAndPassword,
  getAuth, GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  signOut,
  User
} from '@angular/fire/auth';
import { app } from 'src/app/core/config/firebase.confi';
import { ToastService } from './toast-service';
import { Const } from 'src/app/const/const';
import { FireStoreService } from './fire-store-service';
import { IUser } from 'src/app/interfaces/iuser';
import { LocalStorageService } from './local-storage-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private auth = getAuth(app);

  constructor(
    private readonly toastService: ToastService,
    private readonly databaseService: FireStoreService,
    private readonly localStorageService:LocalStorageService,
    private readonly router:Router,
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
        this.localStorageService.set(Const.id, data?.uid);
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

  private saveData(user: User) {
    const nameArray = user.displayName?.split(' ');
    if (nameArray && user.email) {
      const data: IUser = {
        name: nameArray[0],
        lastName: nameArray[1],
        email: user.email,
        uid: user.uid,
        provider: 'google',
        photoURL: user.photoURL || ''
      };
      this.databaseService.setData(Const.userCollection, data);
    }
  }


}
