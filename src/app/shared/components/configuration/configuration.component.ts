import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user-service';
import { ILanguage } from 'src/app/interfaces/ilanguage';
import { LocalStorageService } from '../../services/local-storage-service';
import { Const } from 'src/app/const/const';
import { IConfiguration } from 'src/app/interfaces/iconfiguration';
import { FormControl } from '@angular/forms';
import { TranslateService } from '../../services/translate-service';
import { take } from 'rxjs';
import { ITranslation } from 'src/app/interfaces/itranslation';
import { ITranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss'],
  standalone: false,
})
export class ConfigurationComponent  implements OnInit {

  selectControl = new FormControl('');
  languages:ILanguage[] = [{name: 'Spanish', code: 'es'}, {name: 'English', code: 'en'}];
  value:string = '';
  confi :IConfiguration | null = null;
  translationJson:ITranslation | null = null;

  constructor(
    private readonly user:UserService,
    private readonly localStorage:LocalStorageService,
    private readonly translation:TranslateService
  ) { }

  ngOnInit() {
    this.getLanguageCode();
  }

  salir(){
    this.user.mySingOut();
  }

  doSubmit(){
    const newValue = this.selectControl.value;
    if (newValue && this.confi) {
      this.confi.languageCode = newValue;
      this.value = newValue;
      this.localStorage.set(Const.CONFIGURATION_KEY, this.confi);
      this.getJso();
    }
  }

  private getLanguageCode(){
    this.confi = this.localStorage.get<IConfiguration>(Const.CONFIGURATION_KEY);
    this.value = this.confi?.languageCode || '';
    this.selectControl.setValue(this.value);
    this.getJso();
  }

  private getJso(){
    this.translation.getTranslation<ITranslation>(this.value).pipe(take(1)).subscribe({
      next: (value) => this.translationJson = value,
      error: (err) => console.log(err),
    });
  }

}
