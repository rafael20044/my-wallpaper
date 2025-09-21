import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user-service';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss'],
  standalone: false,
})
export class ConfigurationComponent  implements OnInit {

  constructor(
    private readonly user:UserService
  ) { }

  ngOnInit() {}

  salir(){
    this.user.mySingOut();
  }

}
