import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {Cornflakes} from '../models/cornflakes.Model';

@Injectable({
  providedIn: 'root'
})
export class CornflakeService {

  cornflakeDataList = new Subject<Cornflakes[]>();

  private allCornflakes: Cornflakes[] = [];

  constructor() {
  }


  /**
   * Set all Cornflakes Array to update the list.
   * The List is a observable - each time a change is detected it will
   * updated auto.
   * @param {Cornflakes[]} cornflakes
   */
  setAllCornflakes(cornflakes: Cornflakes[]) {
    if (!cornflakes || cornflakes.length === 0) {
      this.cornflakeDataList.next(null);
      this.allCornflakes = [];
    } else {
      this.allCornflakes = cornflakes.slice();
      this.cornflakeDataList.next(this.allCornflakes);
    }
  }

  clearCornflakeList() {
    this.allCornflakes = [];
    this.cornflakeDataList.next(null);
  }

  /**
   * If an Cornflake has changed the array and the list will
   * be updated as well
   * @param {Cornflakes} cornflake
   */
  updateCornflake(cornflake: Cornflakes) {
    const updateUser: Cornflakes = this.allCornflakes.find(allcornflakes => allcornflakes.id === cornflake.id);
    const index = this.allCornflakes.indexOf(updateUser);
    this.allCornflakes[index] = cornflake;
    this.cornflakeDataList.next(this.allCornflakes.slice());
  }

  /**
   * If an Cornflake is deleted the array and the list will
   * be updated as well
   * @param id
   */
  deleteCornflake(id: string) {
    console.log(id);
    const updateUser: Cornflakes = this.allCornflakes.find(allusers => allusers.id === id);
    const index = this.allCornflakes.indexOf(updateUser);
    this.allCornflakes[index] = updateUser;
    this.allCornflakes.splice(index, 1);
    this.cornflakeDataList.next(this.allCornflakes.slice());
  }

  getCornflake(id: string) {
    return this.allCornflakes.find(user => user.id === id);
  }

  getAllCornflakes() {
    return this.allCornflakes.slice();
  }

  addCreateCornflake(cornflake: Cornflakes) {
    this.allCornflakes.push(cornflake);
    this.cornflakeDataList.next(this.allCornflakes);
  }
}
