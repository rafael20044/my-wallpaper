import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false,
})
export class RegisterPage implements OnInit {

  isEmail:boolean = false;

  constructor() { }

  ngOnInit() {
  }

  getEmiter(isEmail:boolean){
    this.isEmail = isEmail;
  }

  getReturn(isReturn:boolean){
    this.isEmail = !isReturn;
  }

}
