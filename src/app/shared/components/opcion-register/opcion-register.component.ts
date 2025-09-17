import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UserService } from '../../services/user-service';
import { Router } from '@angular/router';
import { User } from '@angular/fire/auth';
import { FireStoreService } from '../../services/fire-store-service';
import { IUser } from 'src/app/interfaces/iuser';
import { Const } from 'src/app/const/const';

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
    private readonly router:Router,
    private readonly databaseService:FireStoreService,
  ) { }

  ngOnInit() {}

  emitIsEmail(){
    this.isEmail.emit(true);
  }

  async registerGoogle(){
    const user:User | undefined = await this.userService.registerWithGoogle();
    if (user) {
      const data = await this.databaseService.findUserByUid(user.uid);
      if (!data) {
        this.saveData(user);
      }
      this.router.navigate(['/home']);
    }
  }

  private saveData(user:User){
    const nameArray = user.displayName?.split(' ');
    if (nameArray && user.email) {
      const data:IUser = {
        name: nameArray[0],
        lastName: nameArray[1],
        email: user.email,
        uid: user.uid
      };
      this.databaseService.setData(Const.userCollection, data);
    }
  }

}
