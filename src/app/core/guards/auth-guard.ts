import { CanActivateFn, Router } from '@angular/router';
import { getAuth, onAuthStateChanged } from '@angular/fire/auth';
import { app } from '../config/firebase.confi';



export const authGuard: CanActivateFn = async (route, state) => {
  const auth = getAuth(app);
  const router = new Router();

  return new Promise<boolean>((resolve) =>{
    onAuthStateChanged(auth, (user) =>{
      if (user) {
        resolve(true);
      }else{
        router.navigate(['/login']);
        resolve(false);
      }
    });
  });
  
  //return true;
};
