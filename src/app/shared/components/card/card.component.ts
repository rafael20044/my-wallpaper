import { Component, Input, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  standalone: false,
})
export class CardComponent  implements OnInit {

  @Input() urlImg:string = '';

  constructor(private sheetController:ActionSheetController) { }

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

  private setWallpaper(target:TargetType){
    console.log(target)
  }

}

type TargetType = 'home' | 'lock' | 'both';
