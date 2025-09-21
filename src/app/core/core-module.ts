import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeviceService } from './service/device-service';
import { FilePickerService } from './service/file-picker-service';
import { ToastService } from '../shared/services/toast-service';
import { Capacitor } from '@capacitor/core';
import { IConfiguration } from '../interfaces/iconfiguration';
import { LocalStorageService } from '../shared/services/local-storage-service';
import { Const } from '../const/const';
import { Translate } from './service/translate';
import { StatusBarService } from './service/status-bar-service';



@NgModule({
  declarations: [],
  providers: [DeviceService, FilePickerService, ToastService, StatusBarService],
  imports: [
    CommonModule
  ]
})
export class CoreModule implements OnInit {
  constructor(
    private readonly file: FilePickerService,
    private readonly deviceService:DeviceService,
    private readonly localStorageService:LocalStorageService,
    private readonly transalte:Translate,
    private readonly statusBarService:StatusBarService
  ) {
    this.ngOnInit();
  }
  ngOnInit() {
    this.permission();
    this.configuration();
  }

  private async permission() {
    if (Capacitor.isNativePlatform()) {
      await this.file.permission();
      await this.statusBarService.modifyStatusBar();
    }
  }

  private async configuration() {
    const confi: IConfiguration | null = this.localStorageService.get(Const.CONFIGURATION_KEY);
    if (!confi) {
      const code = await this.deviceService.getLanguageCode();
      const lang = code.value.substring(0, 2);  
      const confiDefault: IConfiguration = {
        thema: 'light',
        languageCode: (lang === 'es' || lang === 'en') ? code.value : 'en',
      };
      this.transalte.changeLanguage(confiDefault.languageCode);
      this.localStorageService.set(Const.CONFIGURATION_KEY, confiDefault);
      return;
    }
    this.transalte.changeLanguage(confi.languageCode);
  }

}
