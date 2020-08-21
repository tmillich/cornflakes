import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {AgeGroup} from "../../../../models/ageGroup";
import {Cornflakes} from "../../../../models/cornflakes.Model";
import {FormgroupService} from "../../../../services/formgroup.service";

@Component({
  selector: 'cornflake-age-group',
  templateUrl: './cornflake-age-group.component.html',
  styleUrls: ['./cornflake-age-group.component.scss']
})
export class CornflakeAgeGroupComponent implements OnInit {

  @Input() cornflakeForm: FormGroup;
  @Input('disable') disabled: boolean;
  allAgeGroup;

  constructor() {
  }

  ngOnInit() {
    this.allAgeGroup = (new AgeGroup()).getAllAgeGroups();
    if(this.disabled) {
      this.cornflakeForm.get('age_group').disable();
    }
  }
}
