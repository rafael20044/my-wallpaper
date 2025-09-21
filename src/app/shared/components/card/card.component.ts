import { Component, Input, OnInit } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { ActionSheetController } from '@ionic/angular';
import { ToastNative } from 'src/app/core/service/toast-native';
import { Translate } from 'src/app/core/service/translate';
import myPlugin from 'src/plugins/MyPlugin';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  standalone: false,
})
export class CardComponent  implements OnInit {

  @Input() urlImg:string = '';

  constructor(
    private sheetController:ActionSheetController,
    private toastNative:ToastNative,
    private readonly translate:Translate
  ) { }

  ngOnInit() {}

  async showSheet(){
    const opcion = this.translate.getTranslate('card.opcion');
    const home = this.translate.getTranslate('card.home');
    const lock = this.translate.getTranslate('card.lock');
    const both = this.translate.getTranslate('card.both');
    const cancel = this.translate.getTranslate('card.cancel');

    const sheet = await this.sheetController.create({
      header: opcion,
      buttons: [
        {
          text: home,
          handler: () => this.setWallpaper('home'),
        },
        {
          text: lock,
          handler: () => this.setWallpaper('lock'),
        },
        {
          text: both,
          handler: () => this.setWallpaper('both'),
        },
        {
          text: cancel,
          role: 'cancel',
        },
      ],
    });

    await sheet.present();
  }

  private async setWallpaper(target:TargetType){
    if (Capacitor.isNativePlatform()) {
      const ok = this.translate.getTranslate('card.ok');
      const error = this.translate.getTranslate('card.error');
      const isOk = await myPlugin.execute({imgUrl: this.urlImg, target: target});
      this.toastNative.showToast((isOk)? `${ok} ${target}`  : error, 'long');
    }

  }

}

type TargetType = 'home' | 'lock' | 'both';
