import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {

  constructor(
    private readonly userService:UserService
  ) { }

  ngOnInit() {
  }

  signOut(){
    this.userService.mySingOut();
  }

}
