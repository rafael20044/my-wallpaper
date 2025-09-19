import { Component, OnInit } from '@angular/core';
import { DeviceService } from './core/service/device-service';
import { IConfiguration } from './interfaces/iconfiguration';
import { LocalStorageService } from './shared/services/local-storage-service';
import { TranslateService, TranslatePipe, TranslateDirective } from "@ngx-translate/core";
import { Const } from './const/const';
import { FilePickerService } from './core/service/file-picker-service';
import { Capacitor } from '@capacitor/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent implements OnInit{
  constructor(
    private readonly deviceService:DeviceService,
    private readonly localStorageService:LocalStorageService,
    //private readonly translateService:TranslateService,
    private readonly file:FilePickerService
  ){}

  async ngOnInit(){
    this.configuration();
    //this.initTranslateService();
    if (Capacitor.isNativePlatform()) {
      console.log('si')
      await this.file.permission();
    }
  }
  
  private async configuration(){
    const code = await this.deviceService.getLanguageCode();
    const confi:IConfiguration | null = this.localStorageService.get(Const.configurationKey);
    if (!confi) {
      const confiDefault:IConfiguration = {
        thema: 'light',
        languageCode: (code.value === 'es' || code.value === 'en') ? code.value : 'en',
      };
      this.localStorageService.set(Const.configurationKey, confiDefault);
    }
    //console.log(code);
  }

  /*private initTranslateService(){
    this.translateService.addLangs(['en', 'es']);
    this.translateService.setFallbackLang('en');
    this.translateService.use('en');
  }*/

}
