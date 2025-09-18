import { Component, OnInit } from '@angular/core';
import { Const } from 'src/app/const/const';
import { IUser } from 'src/app/interfaces/iuser';
import { IUserAuth } from 'src/app/interfaces/iuser-auth';
import { FireStoreService } from 'src/app/shared/services/fire-store-service';
import { LocalStorageService } from 'src/app/shared/services/local-storage-service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: false,
})
export class ProfilePage implements OnInit {

  user:IUser | null = null;
  isLoading:boolean = false;
  private userAuth:IUserAuth | null = null;

  constructor(
    private readonly fireStorageService:FireStoreService,
    private readonly localStorageService:LocalStorageService
  ) { }

  async ngOnInit() {
    this.userAuth = this.localStorageService.get(Const.userAuth);
    if (this.userAuth) {
      this.isLoading = (!this.user || this.userAuth.isInit);
      console.log(this.isLoading)
      await this.loadUser();
      this.isLoading = false;
      this.userAuth.isInit = false;
      this.localStorageService.set(Const.userAuth, this.userAuth);
    }
  }

  ionViewWillEnter(){
    this.ngOnInit();
  }


  private async loadUser(){
    if (this.userAuth) {
      this.user = await this.fireStorageService.findUserByUid(this.userAuth.uid);
    }
  }
}
