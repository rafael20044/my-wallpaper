import { Component, OnInit } from '@angular/core';
import { Const } from 'src/app/const/const';
import { IUser } from 'src/app/interfaces/iuser';
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
  private id:string = '';

  constructor(
    private readonly fireStorageService:FireStoreService,
    private readonly localStorageService:LocalStorageService
  ) { }

  ngOnInit() {
    this.id = this.localStorageService.get(Const.id) || '';
    this.loadUser();
  }

  ionViewWillEnter(){
    this.isLoading = true;
    this.id = this.localStorageService.get(Const.id) || '';
    this.loadUser();
    this.isLoading = false;
  }


  private async loadUser(){
    this.user = await this.fireStorageService.findUserByUid(this.id);
  }
}
