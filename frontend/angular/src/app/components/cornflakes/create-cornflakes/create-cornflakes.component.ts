import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormGroup} from "@angular/forms";
import {AgeGroup} from "../../../models/ageGroup";
import {CornflakesType} from "../../../models/cornflakesType";
import {Cornflakes} from "../../../models/cornflakes.Model";
import {FormgroupService} from "../../../services/formgroup.service";
import {CornflakeService} from "../../../services/cornflake.service";
import {DataStorageService} from "../../../services/data-storage.service";

@Component({
  selector: 'app-create-cornflakes',
  templateUrl: './create-cornflakes.component.html',
  styleUrls: ['./create-cornflakes.component.scss']
})
export class CreateCornflakesComponent implements OnInit {
  cornflakeForm: FormGroup;
  id: string;
  cornflake: Cornflakes;
  disabled = false;

  constructor(private formGroupService: FormgroupService,
              private router: Router,
              private route: ActivatedRoute,
              private cornflakeService: CornflakeService,
              private dataStorageService: DataStorageService) { }

  ngOnInit() {
    this.cornflakeForm = FormgroupService.getCornflakeFormGroup(this.cornflake);
  }

  onSubmit() {
    if (this.cornflakeForm.touched) {
      if (this.cornflakeForm.valid) {
        const cornflakes = new Cornflakes(this.cornflakeForm.getRawValue());
        cornflakes.age_group = parseInt(cornflakes.age_group.toString());
        cornflakes.type = parseInt(cornflakes.type.toString());
        this.dataStorageService.createCornflake(cornflakes);
        this.router.navigate(['.', {outlets: {modal: null}}], {relativeTo: this.route.parent});
      } else {
        this.formGroupService.validateAllFormFields(this.cornflakeForm);
        alert('Cornflake is not valid');
      }
    } else {
      this.formGroupService.validateAllFormFields(this.cornflakeForm);
      alert('Cornflake could not be created');
    }
  }
}
