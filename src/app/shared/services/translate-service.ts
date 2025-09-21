import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TranslateService {

  constructor(private http:HttpClient){}

  getTranslation<T>(code:string){
    return this.http.get<T>(`/assets/i18n/${code}.json`);
  }
  
}
