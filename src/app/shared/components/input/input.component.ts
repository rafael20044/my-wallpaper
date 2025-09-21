import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Translate } from 'src/app/core/service/translate';

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

  constructor(
    private readonly translate:Translate
  ) { }

  ngOnInit() {
    const text = this.translate.getTranslate('login.2');
    this.helpText = (this.type === 'password') ? text : '';
  }

}

type InputType = 'text' | 'password' | 'email';
