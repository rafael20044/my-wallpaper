import { Component, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Const } from 'src/app/const/const';
import { IUser } from 'src/app/interfaces/iuser';
import { FireStoreService } from 'src/app/shared/services/fire-store-service';
import { ToastService } from 'src/app/shared/services/toast-service';
import { UserService } from 'src/app/shared/services/user-service';

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
    private readonly databaseService:FireStoreService,
    private readonly router:Router,
    private readonly userService:UserService,
    private readonly toastService:ToastService
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
      this.router.navigate(['/home']);
    }
  }

  async registerGoogle() {
    const user: User | undefined = await this.userService.registerWithGoogle();
    if (user) {
      const data = await this.databaseService.findUserByUid(user.uid);
      if (!data) {
        this.saveData(user);
      }
      this.router.navigate(['/home']);
    }
  }

  private saveData(user: User) {
    const nameArray = user.displayName?.split(' ');
    if (nameArray && user.email) {
      const data: IUser = {
        name: nameArray[0],
        lastName: nameArray[1],
        email: user.email,
        uid: user.uid
      };
      this.databaseService.setData(Const.userCollection, data);
    }
  }
}
