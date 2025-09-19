import { Injectable } from '@angular/core';
import {FilePicker} from '@capawesome/capacitor-file-picker';
import { ToastNative } from './toast-native';

@Injectable({
  providedIn: 'root'
})
export class FilePickerService {

  constructor(private toastNative:ToastNative){}

  async permission(){
    try {
      await FilePicker.requestPermissions();
    } catch (error) {
      this.toastNative.showToast('error requesting permission', 'long');
    }
  }

  async pickImage(){
    try {
      const images = await FilePicker.pickImages({
        limit: 1,
        readData: true,
      });
      const img = images.files[0];
      return{
        data: img.data,
        name: img.name,
        mimeType: img.mimeType
      }
      
    } catch (error) {
      console.log(error)
      return;
    }
  }
  
}
