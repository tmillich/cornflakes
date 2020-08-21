import {Component, OnDestroy, OnInit} from '@angular/core';
import {Cornflakes} from "../../models/cornflakes.Model";
import {CornflakesType} from "../../models/cornflakesType";
import {Subscription} from "rxjs";
import {DataStorageService} from "../../services/data-storage.service";
import {CornflakeService} from "../../services/cornflake.service";
import {AgeGroup} from "../../models/ageGroup";

@Component({
  selector: 'app-cornflakes-table',
  templateUrl: './cornflakes-table.component.html',
  styleUrls: ['./cornflakes-table.component.scss']
})
export class CornflakesTableComponent implements OnInit, OnDestroy {
  subscriptionList: Subscription;
  cornflakes: Cornflakes[];

  constructor(private cornflakeService: CornflakeService,
              private datastorageService: DataStorageService
  ) {
  }

  ngOnInit() {
    this.subscriptionList = this.cornflakeService.cornflakeDataList.subscribe(
      (cornflakes: Cornflakes[]) => {
        this.cornflakes = cornflakes;
      }
    );
    this.datastorageService.getAllCornflakes().subscribe((data)=>{
      this.cornflakes = data;
    });
  }

  getCornTyp(type) {
    return (new CornflakesType()).getCornflakeTpye(type);
  }

  getAgeGroup(age_group) {
    return (new AgeGroup()).getCornflakeTpye(age_group);
  }

  ngOnDestroy() {
    this.subscriptionList.unsubscribe();
  }

}
