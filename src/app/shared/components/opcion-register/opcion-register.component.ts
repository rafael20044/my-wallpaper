import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UserService } from '../../services/user-service';
import { Router } from '@angular/router';
import { User } from '@angular/fire/auth';

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
    private readonly router:Router  
  ) { }

  ngOnInit() {}

  emitIsEmail(){
    this.isEmail.emit(true);
  }

  async registerGoogle(){
    const user:User | undefined = await this.userService.registerWithGoogle();
    if (user) {
      
    }
  }

}
