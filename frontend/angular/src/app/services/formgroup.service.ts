import {Injectable} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CornflakeService} from './cornflake.service';
import {Cornflakes} from '../models/cornflakes.Model';

@Injectable({
  providedIn: 'root'
})
export class FormgroupService {

  constructor(private cornflakesService: CornflakeService) {
  }

  static getCornflakeFormGroup(cornflake: Cornflakes): FormGroup {
    return new FormGroup({
      'id': new FormControl({value: (cornflake === undefined ? 1 : cornflake.id), disabled: true}),
      'name': new FormControl((cornflake === undefined ? '' : cornflake.name),
        [Validators.required, Validators.pattern('[A-Z][a-zA-Z- ]*')]),
      'age_group': new FormControl((cornflake === undefined ? 0 : cornflake.age_group),
        [Validators.required, Validators.min(0), Validators.max(2)]),
      'type': new FormControl((cornflake === undefined ? 0 : cornflake.type), [Validators.required, Validators.min(0), Validators.max(3)]),
      'created': new FormControl({value: (cornflake === undefined ? '' : cornflake.created), disabled: true}),
      'updated': new FormControl({value: (cornflake === undefined ? '' : cornflake.updated), disabled: true}),
      'about': new FormControl((cornflake === undefined ? '' : cornflake.about), [Validators.maxLength(1000)]),
      'producer': new FormControl((cornflake === undefined ? '' : cornflake.producer),
        [Validators.required, Validators.pattern('[A-Z][a-zA-Z- ]*')]),
    });
  }

  static getLoginFormGroup(): FormGroup {
    return new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', [Validators.required]),
    });
  }

  static getSignUpFormGroup(): FormGroup {
    return new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.email]),
      'phone': new FormControl('', [Validators.pattern('^\\+[1-9]\\d{1,14}$')]),
      'password': new FormControl('', [Validators.required, Validators.pattern('.{6,100}')]),
      'firstname': new FormControl('', [Validators.required, Validators.pattern('[A-Z][a-zA-Z- ]*')]),
      'lastname': new FormControl('', [Validators.required, Validators.pattern('[A-Z][a-zA-Z- ]*')])
    });
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({onlySelf: true});
      }
    });
  }


}
