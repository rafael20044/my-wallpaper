import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeviceService } from './service/device-service';



@NgModule({
  declarations: [],
  providers: [DeviceService],
  imports: [
    CommonModule
  ]
})
export class CoreModule { }
