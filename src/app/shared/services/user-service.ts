import { Injectable } from '@angular/core';
import { 
  createUserWithEmailAndPassword, 
  getAuth, GoogleAuthProvider, 
  signInWithPopup,
  signInWithEmailAndPassword
} from '@angular/fire/auth';
import { app } from 'src/app/core/config/firebase.confi';
import { ToastService } from './toast-service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private auth = getAuth(app);

  constructor(private readonly toastService:ToastService){}

  async createUserEmailAndPassword(email:string, password:string){
    try {
      const response = await createUserWithEmailAndPassword(this.auth, email, password);
      return response.user.uid;
    } catch (error) {
      this.toastService.presentToast('email already exists', 'top', 'danger');
      return;
    }
  }

  async loginWithEmailAndPassword(email:string, password:string){
    try {
      const result = await signInWithEmailAndPassword(this.auth, email, password);
      return result.user;
    } catch (error) {
      this.toastService.presentToast('Incorrect password or email', 'top', 'danger');
      return;
    }
  }

  async registerWithGoogle(){
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(this.auth, provider);
      return result.user;
    } catch (error) {
      console.log(error);
      return;
    }
  }
}
