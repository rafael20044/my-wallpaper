import { CanActivateFn, Router } from '@angular/router';
import { getAuth, onAuthStateChanged } from '@angular/fire/auth';
import { app } from '../core/config/firebase.confi';

export const isLoggedGuard: CanActivateFn = (route, state) => {
  const auth = getAuth(app);
  const router = new Router();

  return new Promise<boolean>((resolve) =>{
    onAuthStateChanged(auth, (user) =>{
      if (!user) {
        resolve(true);
      }else{
        router.navigate(['/home']);
        resolve(false);
      }
    });
  });
  
  //return true;
};
