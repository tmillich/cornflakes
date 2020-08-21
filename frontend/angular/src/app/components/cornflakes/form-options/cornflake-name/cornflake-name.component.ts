import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {Cornflakes} from "../../../../models/cornflakes.Model";
import {FormgroupService} from "../../../../services/formgroup.service";

@Component({
  selector: 'cornflake-name',
  templateUrl: './cornflake-name.component.html',
  styleUrls: ['./cornflake-name.component.scss']
})
export class CornflakeNameComponent implements OnInit {

  @Input() cornflakeForm: FormGroup;
  @Input('disable') disabled: boolean;

  constructor() {
  }

  ngOnInit() {
    if(this.disabled) {
      this.cornflakeForm.get('name').disable();
    }
  }


}
