import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeviceService } from './service/device-service';
import { FilePickerService } from './service/file-picker-service';



@NgModule({
  declarations: [],
  providers: [DeviceService, FilePickerService],
  imports: [
    CommonModule
  ]
})
export class CoreModule implements OnInit{
  constructor(){}
  ngOnInit() {
    console.log("holaaa");
  }

}
