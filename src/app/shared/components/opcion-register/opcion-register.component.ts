import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UserService } from '../../services/user-service';
import { Router } from '@angular/router';
import { User } from '@angular/fire/auth';
import { FireStoreService } from '../../services/fire-store-service';
import { IUser } from 'src/app/interfaces/iuser';
import { Const } from 'src/app/const/const';
import { LocalStorageService } from '../../services/local-storage-service';

@Component({
  selector: 'app-opcion-register',
  templateUrl: './opcion-register.component.html',
  styleUrls: ['./opcion-register.component.scss'],
  standalone: false,
})
export class OpcionRegisterComponent  implements OnInit {

  @Output() isEmail = new EventEmitter<boolean>;

  constructor(
    private readonly userService:UserService,
  ) { }

  ngOnInit() {}

  emitIsEmail(){
    this.isEmail.emit(true);
  }

  async registerGoogle(){
    await this.userService.registerWithGoogle();
  }

}
