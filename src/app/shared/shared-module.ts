import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { InputComponent } from './components/input/input.component';
import { ButtonComponent } from './components/button/button.component';
import { OpcionRegisterComponent } from './components/opcion-register/opcion-register.component';
import { RegisterEmailComponent } from './components/register-email/register-email.component';



@NgModule({
  declarations: [InputComponent, ButtonComponent, OpcionRegisterComponent, RegisterEmailComponent],
  providers: [],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [InputComponent, ButtonComponent, OpcionRegisterComponent, RegisterEmailComponent],
})
export class SharedModule { }
