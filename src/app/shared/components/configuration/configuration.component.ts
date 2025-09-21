import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ILanguage } from 'src/app/interfaces/ilanguage';
import { LocalStorageService } from '../../services/local-storage-service';
import { Const } from 'src/app/const/const';
import { IConfiguration } from 'src/app/interfaces/iconfiguration';
import { FormControl } from '@angular/forms';
import { ITranslation } from 'src/app/interfaces/itranslation';
import { Translate } from 'src/app/core/service/translate';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss'],
  standalone: false,
})
export class ConfigurationComponent  implements OnInit {

  @Output() currenLan = new EventEmitter<string>();

  selectControl = new FormControl('');
  languages:ILanguage[] = [];
  value:string = '';
  confi :IConfiguration | null = null;
  translationJson:ITranslation = {
    
  }

  constructor(
    private readonly localStorage:LocalStorageService,
    private readonly translation:Translate
  ) { }

  ngOnInit() {
    this.getLanguageCode();
    this.loadLanguages();
  }

  doSubmit(){
    const newValue = this.selectControl.value;
    if (newValue && this.confi) {
      this.confi.languageCode = newValue;
      this.value = newValue;
      this.localStorage.set(Const.CONFIGURATION_KEY, this.confi);
      this.translation.changeLanguage(this.value);
      this.currenLan.emit(this.value);
      this.loadLanguages();
    }
  }

  private getLanguageCode(){
    this.confi = this.localStorage.get<IConfiguration>(Const.CONFIGURATION_KEY);
    this.value = this.confi?.languageCode || '';
    this.selectControl.setValue(this.value);
    this.currenLan.emit(this.value);
  }

  private loadLanguages(){
    if (this.value) {
      this.languages = [
        {name: (this.value==='es') ? 'Español': 'Spanish', code: 'es'}, 
        {name: (this.value==='es') ? 'Ingles': 'English', code: 'en'}];
    }
  }

}
