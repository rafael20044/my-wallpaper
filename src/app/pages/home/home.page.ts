import { Component, OnInit } from '@angular/core';
import { Const } from 'src/app/const/const';
import { FilePickerService } from 'src/app/core/service/file-picker-service';
import { Translate } from 'src/app/core/service/translate';
import { IUser } from 'src/app/interfaces/iuser';
import { IUserAuth } from 'src/app/interfaces/iuser-auth';
import { FireStoreService } from 'src/app/shared/services/fire-store-service';
import { LocalStorageService } from 'src/app/shared/services/local-storage-service';
import { SupabaseService } from 'src/app/shared/services/supabase-service';
import { ToastService } from 'src/app/shared/services/toast-service';
import { UserService } from 'src/app/shared/services/user-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  constructor(
    private readonly translate:Translate
  ){}
  
  ngOnInit(): void {}

  getCurrenLan(code:string){
    this.translate.changeLanguage(code);
  }
}
