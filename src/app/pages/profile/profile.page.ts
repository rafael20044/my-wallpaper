import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Const } from 'src/app/const/const';
import { FilePickerService } from 'src/app/core/service/file-picker-service';
import { IUser } from 'src/app/interfaces/iuser';
import { IUserAuth } from 'src/app/interfaces/iuser-auth';
import { IUserUpdate } from 'src/app/interfaces/iuser-update';
import { FireStoreService } from 'src/app/shared/services/fire-store-service';
import { LocalStorageService } from 'src/app/shared/services/local-storage-service';
import { SupabaseService } from 'src/app/shared/services/supabase-service';
import { ToastService } from 'src/app/shared/services/toast-service';
import { UserService } from 'src/app/shared/services/user-service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: false,
})
export class ProfilePage implements OnInit {

  nameControl = new FormControl('', [Validators.required]);
  lastNameControl = new FormControl('', [Validators.required]);
  emailControl = new FormControl('', [Validators.required, Validators.email]);
  passwordControl = new FormControl('', [Validators.minLength(6)]);
  passwordConfirControl = new FormControl('', [Validators.minLength(6)]);
  formGroup = new FormGroup({
    name: this.nameControl,
    lastName: this.lastNameControl,
    email: this.emailControl,
    password: this.passwordControl
  });
  isProviderEmail: boolean = true;
  user: IUser | null = null;
  isLoading: boolean = false;
  urlPhoto: string = '';
  private userAuth: IUserAuth | null = null;

  constructor(
    private readonly fireStorageService: FireStoreService,
    private readonly localStorageService: LocalStorageService,
    private readonly toastService: ToastService,
    private readonly userService: UserService,
    private readonly file: FilePickerService,
    private readonly supabase: SupabaseService,
  ) { }

  async ngOnInit() {
    this.userAuth = this.localStorageService.get(Const.userAuth);
    if (this.userAuth) {
      this.isLoading = (!this.user || this.userAuth.isInit);
      //console.log(this.isLoading)
      await this.loadUser();
      this.userAuth.isInit = false;
      this.localStorageService.set(Const.userAuth, this.userAuth);
    }
    if (this.user) {
      this.urlPhoto = (this.user.photoURL) ? this.user.photoURL : '/assets/img/person-circle-outline.svg';
      //console.log(this.urlPhoto);
      this.isProviderEmail = this.user.provider === 'email';
    }
    this.initForm();
    this.isLoading = false;
  }

  ionViewWillEnter() {
    this.ngOnInit();
  }

  async doSubmit() {
    if (!this.formGroup.valid) {
      this.toastService.presentToast('Fill in all fields correctly', 'top', 'warning');
      return;
    }
    if (this.passwordControl.value !== this.passwordConfirControl.value) {
      this.toastService.presentToast('Passwords do not match', 'top', 'warning');
      return;
    }
    let data: IUserUpdate = {
      name: this.nameControl.value || '',
      lastName: this.lastNameControl.value || '',
      photoURL: this.user?.photoURL || ''
    }
    this.userService.update(data);
    if (this.user) {
      this.user.name = this.formGroup.value.name || '';
      this.user.lastName = this.formGroup.value.lastName || '';
    }
    this.toastService.presentToast('Updated', 'top', 'primary');
  }


  signOut() {
    this.userService.mySingOut();
  }


  async getImg() {
    const img = await this.file.pickImage();
    //console.log(img);
    if (img && img.data) {
      img.name = img.name.replace(/\s+/g, '-');
      //console.log(img.name)
      const url = await this.supabase.upload(
        'img',
        'images',
        `${Date.now()}-${img.name}`,
        img.data,
        img.mimeType,

      );
      if (url) {
        let data: IUserUpdate = {
          name: this.nameControl.value || '',
          lastName: this.lastNameControl.value || '',
          photoURL: url,
        }
        this.userService.update(data);
        this.urlPhoto = url;
        this.toastService.presentToast('Updated', 'top', 'primary');
      }
    }
  }


  private async loadUser() {
    if (this.userAuth) {
      this.user = await this.fireStorageService.findUserByUid(this.userAuth.uid);
    }
  }

  private initForm() {
    if (this.user) {
      this.nameControl.setValue(this.user.name);
      this.lastNameControl.setValue(this.user.lastName);
      this.emailControl.setValue(this.user.email);
    }
  }
}
