import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class ShowDetailService 
{
  // <how to shared data between different components>, (2), ChartGPT
  private showDetailsSubject = new BehaviorSubject<boolean>(false);

  // Observable to expose the state
  showDetails$ = this.showDetailsSubject.asObservable();

  // Method to toggle the state
  toggleShowDetails() 
  {
    const currentState = this.showDetailsSubject.value;
    this.showDetailsSubject.next(!currentState);
  }

  // Method to set the state explicitly
  setShowDetails(state: boolean) 
  {
    this.showDetailsSubject.next(state);
  }
}
