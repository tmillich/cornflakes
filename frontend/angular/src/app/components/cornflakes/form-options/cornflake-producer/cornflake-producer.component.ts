import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {Cornflakes} from "../../../../models/cornflakes.Model";
import {FormgroupService} from "../../../../services/formgroup.service";

@Component({
  selector: 'cornflake-producer',
  templateUrl: './cornflake-producer.component.html',
  styleUrls: ['./cornflake-producer.component.scss']
})
export class CornflakeProducerComponent implements OnInit {

  @Input() cornflakeForm: FormGroup;
  @Input('disable') disabled: boolean;

  constructor() {
  }

  ngOnInit() {
    if(this.disabled) {
      this.cornflakeForm.get('producer').disable();
    }
  }


}
