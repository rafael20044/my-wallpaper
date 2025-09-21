import { Injectable } from '@angular/core';
import { 
  addDoc, 
  getFirestore, 
  collection, 
  query, where, 
  getDocs, 
  updateDoc,
  doc
} from '@angular/fire/firestore';
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
    const ref = collection(this.db, Const.USER_COLLECTION);
    const q = query(ref, where('uid', '==', uid));
    const result = await getDocs(q);
    let data:IUser | null = null;
    result.forEach(doc => data = doc.data() as IUser);
    return data;
  }

  async updateData(uid:string, data:any){
    const idDoc = await this.findDoc(uid) || '';
    if (idDoc) {
      const ref = doc(this.db, Const.USER_COLLECTION, idDoc);
      await updateDoc(ref, data);
      return true;
    }
    return false;
  }

  private async findDoc(uid:string){
    const ref = collection(this.db, Const.USER_COLLECTION);
    const q = query(ref, where('uid', '==', uid));
    const result = await getDocs(q);
    if (result.empty) {
      console.log('documento no encontrado');
      return;
    }
    let doc:string = '';
    result.forEach(d => doc = d.id);
    return doc;
  }

}
