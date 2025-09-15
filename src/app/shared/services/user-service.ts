import { Injectable } from '@angular/core';
import { createUserWithEmailAndPassword, getAuth } from '@angular/fire/auth';
import {initializeApp} from '@angular/fire/app';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private app = initializeApp(environment.firebaseConfig);
  private auth = getAuth(this.app);

  constructor(){}

  async createUserEmailAndPassword(email:string, password:string){
    try {
      const response = await createUserWithEmailAndPassword(this.auth, email, password);
      return response.user.uid;
    } catch (error) {
      console.log(error);
      return;
    }
  }
}
