import { Injectable } from '@angular/core';
import { addDoc, getFirestore, collection, query, where, getDoc, getDocs} from '@angular/fire/firestore';
import { Const } from 'src/app/const/const';
import { app } from 'src/app/core/config/firebase.confi';
import { IUser } from 'src/app/interfaces/iuser';

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

  async findUserByUid(uid:string):Promise<IUser | null>{
    const ref = collection(this.db, Const.userCollection);
    const q = query(ref, where('uid', '==', uid));
    const result = await getDocs(q);
    let data:IUser | null = null;
    result.forEach(doc => data = doc.data() as IUser);
    return data;
  }

}
