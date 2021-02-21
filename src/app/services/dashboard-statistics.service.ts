import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DashboardStatistics } from '../dashboard/dashboard.component';
import { CommonServiceService } from './common-service.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardStatisticsService {

  constructor(private http: HttpClient, private commonService: CommonServiceService) { }

  getDashboardStatistics(){
    return this.http.get<DashboardStatistics>(this.commonService.BASE_URL+"/getDashboardStatistics");
  }
}
