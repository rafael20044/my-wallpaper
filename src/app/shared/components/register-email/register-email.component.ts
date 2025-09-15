import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-email',
  templateUrl: './register-email.component.html',
  styleUrls: ['./register-email.component.scss'],
  standalone: false,
})
export class RegisterEmailComponent  implements OnInit {

  @Output() isReturn = new EventEmitter<boolean>;

  nameControl = new FormControl('', [Validators.required]);
  lastNameControl = new FormControl('', [Validators.required]);
  emailControl = new FormControl('', [Validators.required, Validators.email]);
  passwordControl = new FormControl('', [Validators.required]);
  passConfir = new FormControl('', [Validators.required]);

  fromGroup = new FormGroup({
    name: this.nameControl,
    lastName: this.lastNameControl,
    email: this.emailControl,
    password: this.passwordControl
  });

  constructor() { }

  ngOnInit() {}

  emiterIsReturn(){
    this.isReturn.emit(true);
  }

  doSubmit(){
    console.log(this.fromGroup.value);
  }

}
