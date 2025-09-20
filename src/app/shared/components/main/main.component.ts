import { Component, OnInit } from '@angular/core';
import { Const } from 'src/app/const/const';
import { IUser } from 'src/app/interfaces/iuser';
import { IUserAuth } from 'src/app/interfaces/iuser-auth';
import { UserService } from '../../services/user-service';
import { FilePickerService } from 'src/app/core/service/file-picker-service';
import { FireStoreService } from '../../services/fire-store-service';
import { LocalStorageService } from '../../services/local-storage-service';
import { SupabaseService } from '../../services/supabase-service';
import { ToastService } from '../../services/toast-service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  standalone: false,
})
export class MainComponent implements OnInit {

  user: IUser | null = null;
  isLoading: boolean = false;
  private userAuth: IUserAuth | null = null;


  constructor(
    private readonly userService: UserService,
    private readonly file: FilePickerService,
    private readonly database: FireStoreService,
    private readonly localStorage: LocalStorageService,
    private readonly supabase: SupabaseService,
    private readonly toastService: ToastService,
  ) { }

  async ngOnInit() {
    this.loadUserAuth();
    if (this.userAuth) {
      this.isLoading = (!this.user || this.userAuth.isInitHome);
      await this.loadUser();
      this.userAuth.isInitHome = false;
      this.isLoading = false;
      this.localStorage.set(Const.userAuth, this.userAuth);
    }
  }

  ionViewWillEnter() {
    this.ngOnInit();
    console.log('funciono')
  }

  signOut() {
    this.userService.mySingOut();
  }

  async pickImg() {
    const img = await this.file.pickImage();
    if (img && img.data) {
      img.name = img.name.replace(/\s+/g, '-');
      const dataUrl = await this.supabase.upload('img', 'wallpapers', img.name, img.data, img.mimeType);
      if (dataUrl && this.user) {
        this.user.wallpapers.push({
          url: dataUrl.url,
          path: dataUrl.path
        });
        await this.database.updateData(this.user.uid, this.user);
        await this.toastService.presentToast('added', 'top', 'primary');
      }
    }
  }


  private async loadUser() {
    if (this.userAuth) {
      this.user = await this.database.findUserByUid(this.userAuth.uid);
    }
  }

  private loadUserAuth() {
    this.userAuth = this.localStorage.get<IUserAuth>(Const.userAuth);
  }

}
