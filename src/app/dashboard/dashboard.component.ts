import { Component, OnInit } from '@angular/core';

import {DashboardService} from '../../providers/dashboard-service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public details: any;
  public name: any;
  public loader = false;

  constructor(public service: DashboardService ) { }

  ngOnInit() {
    // show loader
    this.loader = true;
    // get all image details
    this.service.getAllDetails().subscribe((data: any) => {

     // hide loader once service returned data
      this.loader = false;
      this.details = data.items;
    }, (err) => {
      this.loader = false;
      console.log('error' + err);
    });
  }

  // search by tags
  search() {

    const params = {
      tag : this.name
    };
    // show loader
    this.loader = true;

    this.service.getDetailsByTag(params).subscribe((data: any) => {
      this.loader = false;
      this.details = data.items;
    }, (err) => {
      this.loader = false;
      console.log('error' + err);
    });
  }

  // reset search box and retrive all data
  reset() {
    this.name = '';
    this.ngOnInit();
  }

}
