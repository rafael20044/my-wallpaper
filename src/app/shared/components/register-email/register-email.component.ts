import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastService } from '../../services/toast-service';
import { UserService } from '../../services/user-service';
import { IUser } from 'src/app/interfaces/iuser';
import { FireStoreService } from '../../services/fire-store-service';
import { Const } from 'src/app/const/const';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../services/local-storage-service';
import { IUserAuth } from 'src/app/interfaces/iuser-auth';

@Component({
  selector: 'app-register-email',
  templateUrl: './register-email.component.html',
  styleUrls: ['./register-email.component.scss'],
  standalone: false,
})
export class RegisterEmailComponent implements OnInit {

  @Output() isCancel = new EventEmitter<boolean>;

  nameControl = new FormControl('', [Validators.required]);
  lastNameControl = new FormControl('', [Validators.required]);
  emailControl = new FormControl('', [Validators.required, Validators.email]);
  passwordControl = new FormControl('', [Validators.required, Validators.minLength(6)]);
  passConfir = new FormControl('', [Validators.required, Validators.minLength(6)]);
  isNext = false;

  fromGroup = new FormGroup({
    name: this.nameControl,
    lastName: this.lastNameControl,
    email: this.emailControl,
    password: this.passwordControl
  });

  constructor(
    private readonly toastService: ToastService,
    private readonly userService: UserService,
    private readonly storageService: FireStoreService,
    private readonly router: Router,
    private readonly localStorageService: LocalStorageService,
  ) { }

  ngOnInit() { }

  getIsNext(isNext: boolean) {
    this.isNext = isNext;
  }

  getIsReturn(isReturn: boolean) {
    this.isNext = !isReturn;
  }

  getIsCancel(isCancel: boolean) {
    this.isCancel.emit(isCancel);
  }

  async doSubmit() {
    if (this.fromGroup.invalid) {
      this.toastService.presentToast('Fill in all fields correctly', 'top', 'warning');
      return;
    }

    if (this.passwordControl.value !== this.passConfir.value) {
      this.toastService.presentToast('Passwords do not match', 'top', 'warning');
      return;
    }
    //console.log(this.fromGroup.value);
    const { email, password, name, lastName } = this.fromGroup.value;

    const uid = await this.userService.createUserEmailAndPassword(email || '', password || '');
    if (uid) {
      const user: IUser = {
        uid: uid,
        name: name || '',
        email: email || '',
        lastName: lastName || '',
        provider: 'email',
        photoURL: '',
        wallpapers: [],
        pathPhoto: ''
      }
      const ref = await this.storageService.setData(Const.userCollection, user);
      if (ref) {
        const userAuth: IUserAuth = {
          uid: user.uid,
          isInitProfile: true,
          isInitConfi: true,
          isInitHome: true,
        };
        this.localStorageService.set(Const.userAuth, userAuth);
        this.router.navigate(['/tab/home']);
      }
    }
  }

}
