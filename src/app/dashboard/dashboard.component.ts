import { Component, OnInit } from '@angular/core';

export class weekDet{
  constructor(public weekStartDate: string,public weekEndDate: string, public month : string, public secMonth: string, public weekSale: number){}
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  message="Thank You for visiting!! Dashboard will be in place very soon!!!";
  weeks = [
    new weekDet('03','09','FEB','',70),
    new weekDet('10','16','FEB','',40),
    new weekDet('17','23','FEB','',50),
    new weekDet('24','01','FEB','MAR',60),
    new weekDet('02','08','MAR','',70),
    new weekDet('09','15','MAR','',40),
    new weekDet('16','22','MAR','',80),
    new weekDet('23','29','MAR','',20),
    new weekDet('30','05','MAR','APR',40),
    new weekDet('05','11','APR','',100),
  ]

  titleWkly = 'Weekly Sale(Feb 03-09)';
   typeWkly = 'ColumnChart';
   dataWkly = [
      ['03', 9000],
      ['04', 4000],
      ['05', 5000],
      ['06', 10000],
      ['07', 20000],
      ['08', 8500],
      ['09', 9700] 
   ];
   columnNamesWkly = ['Day Of week', 'Daily Sale (In Rs)'];
   optionsWkly = {
     colors: ["#026877"] 
   };
   widthWkly = 350;
   heightWkly = 400;

  titleMnthly = 'Monthly Sale(Feb 2020)';
   typeMnthly = 'AreaChart';
   dataMnthly = [
      ['03-09', 80000],
      ['10-16', 69000],
      ['17-23', 23000],
      ['24-01', 89000],
   ];
   columnNamesMnthly = ['Week', 'Weekly Sale(In Rs)'];
   optionsMnthly = {
     colors: ["#C25D00"] 
   };
   widthMnthly = 350;
   heightMnthly = 400;
   

   titleYrly = 'Yearly Sale(2020)';
   typeYrly = 'LineChart';
   dataYrly = [
      ['Jan', 80000],
      ['Feb', 69000],
      ['Mar', 23000],
      ['Apr', 89000],
      ['May', 65000],
      ['Jun', 54000],
      ['Jul', 87000],
      ['Aug', 76000],
      ['Sep', 67000],
      ['Oct', 69000],
      ['Nov', 56000],
      ['Dec', 87000],
   ];
   columnNamesYrly = ['Month', 'Monthly Sale(In Rs)'];
   optionsYrly = {
     colors: ["#C28500"] 
   };
   widthYrly = 330;
   heightYrly = 400;

  constructor() { }

  ngOnInit() {
  }

}
