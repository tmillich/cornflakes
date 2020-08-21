import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {Alert} from '../models/alert.model';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  alert: Subject<Alert> = new Subject();

  constructor() {
    this.alert.next(new Alert(false));
  }

  closeDangerAlert() {
    this.alert.next(new Alert(false));
  }

  openDangerAlert(titel: string, message: string) {
    this.alert.next(new Alert(true, titel, message));
  }

  getAlertObservable() {
    return this.alert.asObservable();
  }
}
