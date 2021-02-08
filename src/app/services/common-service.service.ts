import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonServiceService {

  sideNavExpanded = true;
  isLoading = false;
  // public BASE_URL = "http://localhost:8080/demo-0.0.1-SNAPSHOT";
  public BASE_URL = "http://localhost:8080";
  constructor() { }

 toggleSideNav(){
    this.sideNavExpanded = !this.sideNavExpanded;
  }

  getSideNavExpanded(){
    return this.sideNavExpanded;
  }
}
