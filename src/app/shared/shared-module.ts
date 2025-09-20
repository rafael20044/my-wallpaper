import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { InputComponent } from './components/input/input.component';
import { ButtonComponent } from './components/button/button.component';
import { OpcionRegisterComponent } from './components/opcion-register/opcion-register.component';
import { RegisterEmailComponent } from './components/register-email/register-email.component';
import { UserService } from './services/user-service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastService } from './services/toast-service';
import { FireStoreService } from './services/fire-store-service';
import { RegisterEmail1Component } from './components/register-email1/register-email1.component';
import { RegisterEmail2Component } from './components/register-email2/register-email2.component';
import { RouterLink } from '@angular/router';
import { FloatingButtonComponent } from './components/floating-button/floating-button.component';
import { LocalStorageService } from './services/local-storage-service';
import { CardComponent } from './components/card/card.component';
import { MainComponent } from './components/main/main.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ConfigurationComponent } from './components/configuration/configuration.component';



@NgModule({
  declarations: [
    InputComponent, 
    ButtonComponent, 
    OpcionRegisterComponent, 
    RegisterEmailComponent, 
    RegisterEmail1Component,
    RegisterEmail2Component,
    FloatingButtonComponent,
    CardComponent,
    MainComponent,
    ProfileComponent,
    ConfigurationComponent,
  ],
  providers: [
    UserService, 
    ToastService,
    FireStoreService,
    RouterLink,
    LocalStorageService,
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    InputComponent, 
    ButtonComponent, 
    OpcionRegisterComponent, 
    RegisterEmailComponent,
    FloatingButtonComponent,
    CardComponent,
    MainComponent,
    ProfileComponent,
    ConfigurationComponent,
  ],
})
export class SharedModule { }
