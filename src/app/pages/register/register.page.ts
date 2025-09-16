import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false,
})
export class RegisterPage implements OnInit {

  isEmail:boolean = false;

  constructor(
    private readonly router:Router,
  ) { }

  ngOnInit() {
  }

  getEmiter(isEmail:boolean){
    this.isEmail = isEmail;
  }

  getReturn(isReturn:boolean){
    this.isEmail = !isReturn;
  }

  goToRegister(){
    this.router.navigate(['/login'])
  }

}
