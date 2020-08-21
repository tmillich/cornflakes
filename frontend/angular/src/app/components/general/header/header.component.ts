import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  username: string;

  constructor() {
  }

  ngOnInit() {
    if (localStorage.getItem("displayName") && typeof localStorage.getItem("displayName") === 'string') {
      this.username = localStorage.getItem("displayName");
    } else {
      this.username = " ";
    }
  }

}
