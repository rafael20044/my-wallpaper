import { Injectable } from '@angular/core';
import { Device } from '@capacitor/device';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  constructor(){}

  getLanguageCode(){
    return Device.getLanguageCode();
  }
}
