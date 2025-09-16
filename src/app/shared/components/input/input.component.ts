import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  standalone: false,
})
export class InputComponent  implements OnInit {

  @Input() type:InputType = 'text';
  @Input() label:string = '';
  @Input() placeholder:string = '';
  @Input() control = new FormControl();

  helpText:string = '';

  constructor() { }

  ngOnInit() {
    this.helpText = (this.type === 'password') ? 'minimum 6 characters' : '';
  }

}

type InputType = 'text' | 'password' | 'email';
