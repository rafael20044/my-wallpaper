import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-register-email2',
  templateUrl: './register-email2.component.html',
  styleUrls: ['./register-email2.component.scss'],
  standalone: false,
})
export class RegisterEmail2Component  implements OnInit {

  @Input() emailControl = new FormControl();
  @Input() passwordControl = new FormControl();
  @Input() passConfir = new FormControl();
  @Output() isReturn = new EventEmitter<boolean>;

  constructor() { }

  ngOnInit() {}

  emiterIsReturn() {
    this.isReturn.emit(true);
  }

}
