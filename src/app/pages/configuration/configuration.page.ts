import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user-service';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.page.html',
  styleUrls: ['./configuration.page.scss'],
  standalone: false,
})
export class ConfigurationPage implements OnInit {

  constructor(
    private readonly userService:UserService
  ) { }

  ngOnInit() {
  }

  salir(){
    this.userService.mySingOut();
  }

}
