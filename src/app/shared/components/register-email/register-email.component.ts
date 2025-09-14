import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-register-email',
  templateUrl: './register-email.component.html',
  styleUrls: ['./register-email.component.scss'],
  standalone: false,
})
export class RegisterEmailComponent  implements OnInit {

  @Output() isReturn = new EventEmitter<boolean>;

  constructor() { }

  ngOnInit() {}

  emiterIsReturn(){
    this.isReturn.emit(true);
  }

}
