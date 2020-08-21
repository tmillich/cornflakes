import {Component, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {Cornflakes} from "../../../models/cornflakes.Model";
import {FormgroupService} from "../../../services/formgroup.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {CornflakeService} from "../../../services/cornflake.service";
import {DataStorageService} from "../../../services/data-storage.service";
import {CornflakesType} from "../../../models/cornflakesType";

@Component({
  selector: 'app-edit-cornflakes',
  templateUrl: './edit-cornflakes.component.html',
  styleUrls: ['./edit-cornflakes.component.scss']
})
export class EditCornflakesComponent implements OnInit {

  cornflakeForm: FormGroup;
  id: string;
  cornflake: Cornflakes;
  disabled = false;

  constructor(private formGroupService: FormgroupService,
              private router: Router,
              private route: ActivatedRoute,
              private cornflakeService: CornflakeService,
              private dataStorageService: DataStorageService) {
  }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
      }
    );

    this.cornflake = this.cornflakeService.getCornflake(this.id);
    this.cornflakeForm = FormgroupService.getCornflakeFormGroup(this.cornflake);
  }

  onSubmit() {
    console.log(this.cornflakeForm);
    if (this.cornflakeForm.touched) {
      if (this.cornflakeForm.valid) {
        const cornflakes = new Cornflakes(this.cornflakeForm.getRawValue());
        cornflakes.age_group = parseInt(cornflakes.age_group.toString());
        cornflakes.type = parseInt(cornflakes.type.toString());
        this.dataStorageService.updateCornflake(cornflakes);
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
