import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ILanguage } from 'src/app/interfaces/ilanguage';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  standalone: false,
})
export class SelectComponent  implements OnInit {

  @Input() languages:ILanguage[] = [];
  @Input() value:string = '';
  @Input() label:string = '';
  @Input() control = new FormControl();

  constructor() { }

  ngOnInit() {}

}
