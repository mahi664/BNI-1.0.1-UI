import { Component, OnInit, HostListener } from '@angular/core';

export class product{
  constructor(public batchNo: string, public productName: String,public qty:number,public price:number,public cgst:number,
              public sgst:number,public total:number,public disc:number){}
}

export class batchNos{
  constructor(public batchno:string){}
}

@Component({
  selector: 'app-invoice-generation',
  templateUrl: './invoice-generation.component.html',
  styleUrls: ['./invoice-generation.component.css']
})
export class InvoiceGenerationComponent implements OnInit {

  public keypressed;
  invoiceId=20200001;
  invoiceDate=new Date();
  products=[];
  batchDropDowns=[];
  batchNoList=["BD2226","BD1221","XD4433","XD5565","VD5445"];
  filteredBatchNos: string[] =[];
  selectedIndex = -1;

  constructor() { }

  ngOnInit(): void {
    this.products.push(new product("","", 0, 0, 0, 0, 0,0));
    this.batchDropDowns.push(false);
    this.filteredBatchNos=[];
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.keypressed = event.key; 
    
  }

  addProductIntoInvoice(){
    this.batchDropDowns.push(false);
    this.products.push(new product("","", 0, 0, 0, 0, 0, 0));
  }

  removeProductFromInvoice(batchNo:string){
    if(batchNo==="")
    {
      this.products.pop();
    }
    else{
      this.products = this.products.filter((product)=>product.batchNo!=batchNo);
    }
  }

  save(){
    console.log(this.products);
  }

  getFilteredList(inputItem: string){
    if(inputItem==='')
      this.filteredBatchNos = [];
    else this.filteredBatchNos = this.batchNoList.filter((item) => item.toLowerCase().includes(inputItem.toLowerCase()));
  }

  toggleListDisplay(sender: number,index:number, product) {

    if (sender === 1) {
      // this.selectedIndex = -1;
      this.batchDropDowns[index] = true;
      this.getFilteredList(product.batchNo);
    } else {
      // helps to select item by clicking
      setTimeout(() => {
        // this.selectItem(this.selectedIndex);
        // this.listHidden = true;
        product.batchNo = product.batchNo;
        this.batchDropDowns[index] = false;
      }, 100);
    }
  }

  selectItem(batch:string,index:number,product){
    this.batchDropDowns[index]=false;
    product.batchNo = batch;
  }

  onKeyPress(event,index,product) {

    if (this.batchDropDowns[index]==true) {
      if (event.key === 'Escape') {
        this.selectedIndex = -1;
        this.toggleListDisplay(0,index,product);
      }

      if (event.key === 'Enter') {

        this.toggleListDisplay(0,index,product);
      }
      if (event.key === 'ArrowDown') {

        this.batchDropDowns[index] = true;
        this.selectedIndex = (this.selectedIndex + 1) % this.filteredBatchNos.length;
        product.batchNo = this.filteredBatchNos[this.selectedIndex];
        if (this.filteredBatchNos.length > 0 && this.batchDropDowns[index]==true) {
          // document.getElementsByTagName('list-item')[this.selectedIndex].scrollIntoView();
        }
      } else if (event.key === 'ArrowUp') {

        this.batchDropDowns[index] = true;
        if (this.selectedIndex <= 0) {
          this.selectedIndex = this.filteredBatchNos.length;
        }
        this.selectedIndex = (this.selectedIndex - 1) % this.filteredBatchNos.length;
        product.batchNo = this.filteredBatchNos[this.selectedIndex];
        if (this.filteredBatchNos.length > 0 && this.batchDropDowns[index]==true) {

          // document.getElementsByTagName('list-item')[this.selectedIndex].scrollIntoView();
        }
      }
    } 
  }
}
