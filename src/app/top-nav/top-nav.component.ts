import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from '../services/common-service.service';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent implements OnInit {

  constructor(private commonService: CommonServiceService) { }

  ngOnInit(): void {
  }

  toggleSideNav(){
    if(this.commonService.getSideNavExpanded()){
      document.getElementById('sidenavicon').className = 'fas fa-bars';
    }
    else{
      document.getElementById('sidenavicon').className = 'fas fa-arrow-left';
    }
    this.commonService.toggleSideNav();
  }
}
