import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UpdateFormService 
{
  // <how to shared data between different components>, (2), ChartGPT
  private tableDataSource = new BehaviorSubject<any>(null);
  tableData$ = this.tableDataSource.asObservable();

  // Method to update form data when a table row is clicked
  updateFormData(data: any) 
  {
    this.tableDataSource.next(data);
  }
}
