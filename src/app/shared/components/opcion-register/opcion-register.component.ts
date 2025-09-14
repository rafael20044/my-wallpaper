import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-opcion-register',
  templateUrl: './opcion-register.component.html',
  styleUrls: ['./opcion-register.component.scss'],
  standalone: false,
})
export class OpcionRegisterComponent  implements OnInit {

  @Output() isEmail = new EventEmitter<boolean>;

  constructor() { }

  ngOnInit() {}

  emitIsEmail(){
    this.isEmail.emit(true);
  }

}
