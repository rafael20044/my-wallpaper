import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-register-email1',
  templateUrl: './register-email1.component.html',
  styleUrls: ['./register-email1.component.scss'],
  standalone: false,
})
export class RegisterEmail1Component  implements OnInit {

  @Input() nameControl = new FormControl();
  @Input() lastNameControl = new FormControl();

  @Output() isCancel = new EventEmitter<boolean>;
  @Output() isNext = new EventEmitter<boolean>;

  constructor() { }

  ngOnInit() {}

  emiterIsCancel(){
    this.isCancel.emit(true);
  }

  emiterIsNext(){
    this.isNext.emit(true);
  }

}
