import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { InputComponent } from './components/input/input.component';
import { ButtonComponent } from './components/button/button.component';
import { OpcionRegisterComponent } from './components/opcion-register/opcion-register.component';
import { RegisterEmailComponent } from './components/register-email/register-email.component';
import { UserService } from './services/user-service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [InputComponent, ButtonComponent, OpcionRegisterComponent, RegisterEmailComponent],
  providers: [UserService],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [InputComponent, ButtonComponent, OpcionRegisterComponent, RegisterEmailComponent],
})
export class SharedModule { }
