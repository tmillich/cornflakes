import {Component, OnInit} from '@angular/core';
import {AlertService} from './services/alert.service';
import {Alert} from './models/alert.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'myapp';

  dangerAlert: Alert = new Alert(false);

  constructor(private alertService: AlertService) {
    alertService.getAlertObservable().subscribe((data: Alert) => {
      this.dangerAlert = data;
    });
  }

  ngOnInit(): void {
  }

  closeAlert() {
    this.alertService.closeDangerAlert();
  }
}
