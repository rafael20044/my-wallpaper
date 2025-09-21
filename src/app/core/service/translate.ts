import { Injectable, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { take } from 'rxjs';
import { LocalStorageService } from 'src/app/shared/services/local-storage-service';

@Injectable({
  providedIn: 'root'
})
export class Translate {

  constructor(private translate:TranslateService, private localStorage:LocalStorageService){
    this.translate.addLangs(['en', 'es']);
  }

  changeLanguage(code:string){
    this.translate.use(code);
  }

  getTranslate(message:string){
    return this.translate.instant(message);
  }

}
