import {Component, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {Cornflakes} from "../../../models/cornflakes.Model";
import {FormgroupService} from "../../../services/formgroup.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {CornflakeService} from "../../../services/cornflake.service";
import {DataStorageService} from "../../../services/data-storage.service";
import {CornflakesType} from "../../../models/cornflakesType";

@Component({
  selector: 'app-delete-cornflakes',
  templateUrl: './delete-cornflakes.component.html',
  styleUrls: ['./delete-cornflakes.component.scss']
})
export class DeleteCornflakesComponent implements OnInit {

  cornflakeForm: FormGroup;
  id: string;
  cornflake: Cornflakes;
  disabled = true;

  constructor(private formGroupService: FormgroupService,
              private router: Router,
              private route: ActivatedRoute,
              private cornflakeService: CornflakeService,
              private dataStorageService: DataStorageService) {
  }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        console.log(params['id']);
        this.id =  params['id'];
      }
    );

    this.cornflake = this.cornflakeService.getCornflake(this.id);
    this.cornflakeForm = FormgroupService.getCornflakeFormGroup(this.cornflake);
  }

  onDelete() {
    this.dataStorageService.deleteCornflake(this.id);
    this.router.navigate(['.', {outlets: {modal: null}}], {relativeTo: this.route.parent});
  }
}
