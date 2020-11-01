import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonServiceService {

  sideNavExpanded = true;
  constructor() { }

 toggleSideNav(){
    this.sideNavExpanded = !this.sideNavExpanded;
  }

  getSideNavExpanded(){
    return this.sideNavExpanded;
  }
}
