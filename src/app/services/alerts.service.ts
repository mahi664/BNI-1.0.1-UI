import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {
  isWarning = false;
  isError = false;
  isSuccess = false;
  alertContent = "";

  
  constructor() { }

  showAlert(response: string, alert: string){
    this.alertContent = response;
    console.log(alert);
    if(alert==='SUCCESS')
      this.isSuccess=true;
    else if(alert==='WARNING')
      this.isWarning=true;
    else if(alert==='ERROR')
      this.isError=true;
  }

  hideAlert(alert: string){
    this.alertContent='';
    if(alert==='SUCCESS')
      this.isSuccess=false;
    else if(alert==='WARNING')
      this.isWarning=false;
    else if(alert==='ERROR')
      this.isError=false;
  }
}
