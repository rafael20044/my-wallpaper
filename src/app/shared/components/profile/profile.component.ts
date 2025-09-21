import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IUser } from 'src/app/interfaces/iuser';
import { IUserAuth } from 'src/app/interfaces/iuser-auth';
import { FireStoreService } from '../../services/fire-store-service';
import { LocalStorageService } from '../../services/local-storage-service';
import { ToastService } from '../../services/toast-service';
import { UserService } from '../../services/user-service';
import { FilePickerService } from 'src/app/core/service/file-picker-service';
import { SupabaseService } from '../../services/supabase-service';
import { Const } from 'src/app/const/const';
import { IUserUpdate } from 'src/app/interfaces/iuser-update';
import { Translate } from 'src/app/core/service/translate';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  standalone: false,
})
export class ProfileComponent implements OnInit {

  nameControl = new FormControl('', [Validators.required]);
  lastNameControl = new FormControl('', [Validators.required]);
  formGroup = new FormGroup({
    name: this.nameControl,
    lastName: this.lastNameControl,
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
    private readonly translate:Translate
  ) { }

  async ngOnInit() {
    this.userAuth = this.localStorageService.get(Const.USER_AUTH);
    if (this.userAuth) {
      this.isLoading = (!this.user || this.userAuth.isInitProfile);
      //console.log(this.isLoading)
      await this.loadUser();
      this.userAuth.isInitProfile = false;
      this.localStorageService.set(Const.USER_AUTH, this.userAuth);
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
    const uno = this.translate.getTranslate('profile.1');
    const dos = this.translate.getTranslate('profile.2');
    if (!this.formGroup.valid) {
      this.toastService.presentToast(uno, 'top', 'warning');
      return;
    }
    let data: IUserUpdate = {
      name: this.nameControl.value || '',
      lastName: this.lastNameControl.value || '',
      photoURL: this.user?.photoURL || '',
      wallpapers: this.user?.wallpapers || [],
      pathPhoto: this.user?.pathPhoto || '',
    }
    this.userService.update(data);
    if (this.user) {
      this.user.name = this.formGroup.value.name || '';
      this.user.lastName = this.formGroup.value.lastName || '';
    }
    this.toastService.presentToast(dos, 'top', 'primary');
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
      const dataUrl = await this.supabase.upload(
        Const.BUCKET,
        'photos',
        `${Date.now()}-${img.name}`,
        img.data,
        img.mimeType,

      );
      if (dataUrl) {
        let data: IUserUpdate = {
          name: this.nameControl.value || '',
          lastName: this.lastNameControl.value || '',
          photoURL: dataUrl.url,
          wallpapers: this.user?.wallpapers || [],
          pathPhoto: dataUrl.path || '',
        }
        this.userService.update(data);
        this.urlPhoto = dataUrl.url;
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
    }
  }
}
