import { Injectable } from '@angular/core';
import { addDoc, getFirestore, collection} from '@angular/fire/firestore';
import { app } from 'src/app/core/config/firebase.confi';

@Injectable({
  providedIn: 'root'
})
export class FireStoreService {

  private db = getFirestore(app);

  constructor(){}

  async setData(nameCollection:string, data:any){
    try {
      const collectionRef = collection(this.db, nameCollection);
      const ref = await addDoc(collectionRef, data);
      return ref;
    } catch (error) {
      console.log(error);
      return;
    }
  }

}
