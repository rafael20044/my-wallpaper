import { Component, Input, OnInit } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { ActionSheetController } from '@ionic/angular';
import { ToastNative } from 'src/app/core/service/toast-native';
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
  ) { }

  ngOnInit() {}

  async showSheet(){
    const sheet = await this.sheetController.create({
      header: 'Opcions',
      buttons: [
        {
          text: 'Home screen',
          handler: () => this.setWallpaper('home'),
        },
        {
          text: 'Lock screen',
          handler: () => this.setWallpaper('lock'),
        },
        {
          text: 'Both',
          handler: () => this.setWallpaper('both'),
        },
        {
          text: 'Cancel',
          role: 'cancel',
        },
      ],
    });

    await sheet.present();
  }

  private async setWallpaper(target:TargetType){
    if (Capacitor.isNativePlatform()) {
      const isOk = await myPlugin.execute({imgUrl: this.urlImg, target: target});
      this.toastNative.showToast((isOk)? `Wallpaper set ${target}`  : 'Failed to set wallpapers', 'long');
    }

  }

}

type TargetType = 'home' | 'lock' | 'both';
