import { Component, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Const } from 'src/app/const/const';
import { IUser } from 'src/app/interfaces/iuser';
import { FireStoreService } from 'src/app/shared/services/fire-store-service';
import { ToastService } from 'src/app/shared/services/toast-service';
import { UserService } from 'src/app/shared/services/user-service';
import {TranslatePipe, TranslateDirective} from "@ngx-translate/core";
import { LocalStorageService } from 'src/app/shared/services/local-storage-service';
import { IUserAuth } from 'src/app/interfaces/iuser-auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {

  emailControl = new FormControl('', [Validators.required, Validators.email]);
  passwordControl = new FormControl('', [Validators.required, Validators.minLength(6)]);
  formGroup = new FormGroup({
    email: this.emailControl,
    password: this.passwordControl,
  });

  constructor(
    private readonly router:Router,
    private readonly userService:UserService,
    private readonly toastService:ToastService,
    private readonly localStorageService:LocalStorageService
  ) { }

  ngOnInit() {
  }

  async doSubmit(){
    if (!this.formGroup.valid) {
      this.toastService.presentToast('Fill in all fields correctly', 'top', 'warning');
      return;
    }
    const {email, password} = this.formGroup.value;
    const user = await this.userService.loginWithEmailAndPassword(email || '', password || '');
    if (user) {
      const userAuth:IUserAuth = {
        uid: user.uid,
        isInitProfile: true,
        isInitConfi: true,
        isInitHome: true,
      };
      this.localStorageService.set(Const.USER_AUTH, userAuth);
      this.router.navigate(['/home']);
    }
  }

  async registerGoogle() {
    await this.userService.registerWithGoogle();
  }
}
