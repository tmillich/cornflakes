import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/internal/operators';
import {Cornflakes} from '../models/cornflakes.Model';
import {CornflakeService} from './cornflake.service';
import {AlertService} from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {


  constructor(private httpClient: HttpClient,
              private cornflakeService: CornflakeService,
              private alertService: AlertService) {

    this.getAllCornflakes().subscribe(
      (cornflakes) => {
        this.cornflakeService.setAllCornflakes(cornflakes);
      }
    );
  }

  // GET a all Cornflakes
  getAllCornflakes() {
    return this.httpClient.get<Cornflakes[]>('/api/cornflake/all', {
      headers: {
        'Authorization': localStorage.getItem('token')
      }
    }).pipe(map(
      (cornflakes: Cornflakes[]) => {
        return cornflakes;
      }));
  }

  // CREATE a new Cornflakes
  createCornflake(cornflake: Cornflakes) {
    this.httpClient.post<Cornflakes>('/api/cornflake/add', cornflake, {
      headers: {
        'Authorization': localStorage.getItem('token')
      }
    }).subscribe(
      (cornflake_server: Cornflakes) => {
        this.cornflakeService.addCreateCornflake(cornflake_server);
      },
      (error) => {
        this.alertService.openDangerAlert('Create Cornflake', error.message);
      }
    );
  }

  getAllCornflakesUpdate() {
    this.getAllCornflakes().subscribe(
      (cornflakes) => {
        this.cornflakeService.setAllCornflakes(cornflakes);
      }
    );
  }

  // Update a Cornflake
  updateCornflake(cornflake: Cornflakes) {
    this.httpClient.put<Cornflakes>('/api/cornflake/update', cornflake, {
      headers: {
        'Authorization': localStorage.getItem('token')
      }
    }).subscribe(
      (cornflake_server: Cornflakes) => {
        this.cornflakeService.updateCornflake(cornflake_server);
      },
      (error) => {
        this.alertService.openDangerAlert('update Cornflake', error.message);
      }
    );
  }

  // DELETE a Cornflake
  deleteCornflake(id: string) {
    this.httpClient.delete<Cornflakes>('/api/cornflake/delete?id=' + id, {
      headers: {
        'Authorization': localStorage.getItem('token')
      }
    }).subscribe(
      (cornflake_server: Cornflakes) => {
        this.cornflakeService.deleteCornflake(id);
      },
      (error) => {
        this.alertService.openDangerAlert('Delete Cornflake', error.message);
      }
    );
  }

  // GET a Cornflake
  getCornflake(id: string) {
    return this.httpClient.get<Cornflakes>('/api/cornflake?id=' + id, {
      headers: {
        'Authorization': localStorage.getItem('token')
      }
    }).pipe(map(
      (cornflakes: Cornflakes) => {
        return cornflakes;
      }));
  }

}
