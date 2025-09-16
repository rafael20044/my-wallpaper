import { Injectable } from '@angular/core';
import { createUserWithEmailAndPassword, getAuth } from '@angular/fire/auth';
import { app } from 'src/app/core/config/firebase.confi';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private auth = getAuth(app);

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
