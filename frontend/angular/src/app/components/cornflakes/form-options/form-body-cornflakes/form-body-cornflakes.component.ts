import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'form-body-cornflakes',
  templateUrl: './form-body-cornflakes.component.html',
  styleUrls: ['./form-body-cornflakes.component.scss']
})
export class FormBodyCornflakesComponent implements OnInit {

  @Input() cornflakeForm: FormGroup;
  @Input('disable') disabled: boolean;

  constructor() { }

  ngOnInit() {
  }

}
