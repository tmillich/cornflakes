import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-standard-modal',
  templateUrl: './standard-modal.component.html',
  styleUrls: ['./standard-modal.component.scss']
})
export class StandardModalComponent implements OnInit {
  constructor( private router : Router, private route: ActivatedRoute) {}

  ngOnInit() {

  }

  /**
   * You can find further information on confluence-topic "Frontend - Modal implementation"
   */
  closeModal(){
    this.router.navigate(['.', { outlets: { modal: null } }], { relativeTo: this.route.parent});
  }
}
