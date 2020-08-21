import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {AgeGroup} from "../../../../models/ageGroup";
import {CornflakesType} from "../../../../models/cornflakesType";
import {Cornflakes} from "../../../../models/cornflakes.Model";
import {FormgroupService} from "../../../../services/formgroup.service";

@Component({
  selector: 'cornflake-type',
  templateUrl: './cornflake-type.component.html',
  styleUrls: ['./cornflake-type.component.scss']
})
export class CornflakeTypeComponent implements OnInit {

  @Input() cornflakeForm: FormGroup;
  @Input('disable') disabled: boolean;
  allTypes;

  constructor() {
  }

  ngOnInit() {
    this.allTypes = (new CornflakesType()).getAllCornflakeTypes();
    if(this.disabled) {
      this.cornflakeForm.get('type').disable();
    }
  }

}
