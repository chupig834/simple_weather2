import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResultStatusService 
{
  private result:String = 'results';

  setResult(input:String):void
  {
    this.result = input;
  }
  getResult()
  {
    return this.result;
  }

}
