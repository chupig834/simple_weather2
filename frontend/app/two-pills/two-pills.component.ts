import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ResultStatusService } from '../result-status.service';
import { WeatherComponent } from '../weather/weather.component';
import { FavoriteComponent } from '../favorite/favorite.component';
import { FaverrorComponent } from '../faverror/faverror.component';
import { FavoriteService } from '../favorite.service';

@Component({
  selector: 'app-two-pills',
  standalone: true,
  imports: [CommonModule,WeatherComponent, FavoriteComponent,FaverrorComponent],
  templateUrl: './two-pills.component.html',
  styleUrl: './two-pills.component.css'
})
export class TwoPillsComponent
{
  constructor(private resultStore: ResultStatusService, private favAPI:FavoriteService){
  }
  @Input() receivedData: any;

  mapLength:number = 0;
  intervalId: any;

  activeTab: string = 'results';
  setActiveTab(tab:string)
  {
    this.activeTab = tab;
    this.resultStore.setResult(tab);
    console.log("tab:", this.activeTab);
  }
}
