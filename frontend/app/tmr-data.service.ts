import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TmrDataService 
{
  private jsonData = '';
  page: number = 1;

  detailOn: boolean = true;

  receivedData(input:any)
  {
    this.jsonData = input;
    console.log(this.jsonData);
  }
  getData()
  {
    return this.jsonData;
  }
  receivedClickPage(input:number)
  {
    this.page = input;
  }
  getReceivedClickPage()
  {
    return this.page;
  }
  offDetail()
  {
    return false;
  }
}
