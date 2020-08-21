import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {FormgroupService} from "../../../../services/formgroup.service";
import {Cornflakes} from "../../../../models/cornflakes.Model";

@Component({
  selector: 'cornflake-about',
  templateUrl: './cornflake-about.component.html',
  styleUrls: ['./cornflake-about.component.scss']
})
export class CornflakeAboutComponent implements OnInit {

  @Input() cornflakeForm: FormGroup;
  @Input('disable') disabled: boolean;

  constructor() {
  }

  ngOnInit() {
    if(this.disabled) {
      this.cornflakeForm.get('about').disable();
    }
  }

}
