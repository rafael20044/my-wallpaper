import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private readonly toastController:ToastController) { }

  async presentToast(message:string, position:PositionType, color:ColorType) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      position: position,
      color: color,
    });

    await toast.present();
  }
}

type PositionType = 'top' | 'middle' | 'bottom';
type ColorType = 'danger' | 'warning' | 'primary';
