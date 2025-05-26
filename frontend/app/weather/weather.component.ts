import { Component, OnInit, Input, SimpleChanges} from '@angular/core';
import { TmrApiService  } from '../tmr-api.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { TmrDataService } from '../tmr-data.service';
import { DayViewComponent } from '../day-view/day-view.component';
import { CommonModule } from '@angular/common';
import { ResultStatusService } from '../result-status.service';
import { TempChartComponent } from '../temp-chart/temp-chart.component';
import { TempMetComponent } from '../temp-met/temp-met.component';
import { DetailInfoComponent } from '../detail-info/detail-info.component';
import { ShowDetailService } from '../show-detail.service';
import { GoogleMapComponent } from '../google-map/google-map.component';
import { GeoServiceService } from '../geo-service.service';
import { FavoriteComponent } from '../favorite/favorite.component';
import { FavoriteService } from '../favorite.service';
import {animate, state, style, transition, trigger} from '@angular/animations';



@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [DayViewComponent,CommonModule, TempChartComponent, TempMetComponent, DetailInfoComponent, GoogleMapComponent],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.css',
  animations: [
    trigger('slide', [
      // Define states with correct style properties
      state('false', style({ transform: 'translateX(200%)' })),
      state('true', style({ transform: 'translateX(0)' })),

      // Enter transition: Slide in from the right
      transition(':enter', [
        style({ transform: 'translateX(200%)', opacity: 0 }),
        animate('0.7s ease-in-out', style({ transform: 'translateX(0)', opacity: 1 })),
      ]),

      // Leave transition: Slide out to the left
      transition(':leave', [
        animate('0.5s ease-in-out', style({ transform: 'translateX(200%)', opacity: 0 })),
      ]),
    ]),

    trigger('slide2', [
      // Define states with correct style properties
      state('false', style({ transform: 'translateX(-200%)' })),
      state('true', style({ transform: 'translateX(0)' })),

      // Enter transition: Slide in from the right
      transition(':enter', [
        style({ transform: 'translateX(-200%)', opacity: 0 }),
        animate('0.7s ease-in-out', style({ transform: 'translateX(0)', opacity: 1 })),
      ]),

      // Leave transition: Slide out to the left
      transition(':leave', [
        animate('0.5s ease-in-out', style({ transform: 'translateX(-200%)', opacity: 0 })),
      ]),
    ]),
  ],
})
export class WeatherComponent
{
  r:String = '';
  constructor(private favAPI: FavoriteService, private geoServ: GeoServiceService, private showDetailsService: ShowDetailService, private apiService: TmrApiService, private http: HttpClient, private dataService: TmrDataService, private storeResult: ResultStatusService) {
    this.r = this.storeResult.getResult(); 
  }
  message = '';
  addr = '';
  city = '';
  state = '';
  @Input() receivedData: any;
  parentData: string = 'Loading...';
  receivedResult: boolean = false;
  showDetails: boolean = false;
  cityName: any;
  stateName: any;
  activeDTab: string = 'dayview';
  checkB: any = '';
  
  location: any;

  clickedStar = "currentColor";

  ngOnInit(): void 
  {
    // Subscribe to changes in the service
    this.showDetailsService.showDetails$.subscribe((state) => {
      this.showDetails = state;
    });
  }
  async fetchData(addressF:string)
  {

    if(this.checkB === true)
    {
      this.location = await this.geoServ.getGeo();
      this.cityName = this.geoServ.getCity();
      this.stateName = this.geoServ.getState();
      return this.location;
    }
    else
    {
      console.log("finalAdd:",addressF);
      this.location = await this.apiService.getLocation(addressF);
      this.cityName = this.apiService.getCity();
      this.stateName = this.apiService.getState();
      return this.location;
    }
  }
  async ngOnChanges(changes: SimpleChanges) 
  {
    let addressF = '';
    let finalAdd = '';
    if (changes['receivedData'] && this.receivedData) {

      this.checkB = this.receivedData.check;
      if(this.checkB === null)
      {
        let addr = this.receivedData.inputStreet;
        this.cityName = this.receivedData.inputCity.city;
        this.stateName = this.receivedData.inputState;
        if(addr === "*")
        {
          finalAdd = this.cityName + " " + this.stateName;
          addressF = finalAdd.replace(/\s+/g, '+');
        }
        else
        {
          finalAdd = addr + " " + this.cityName + " " + this.stateName;
          addressF = finalAdd.replace(/\s+/g, '+');
        }
      }
      const location2 = await this.fetchData(addressF);

      console.log("loc2:", location2);
      
      const localApiUrl = 'http://localhost:8080/api/hello';
      const cloudApiUrl = 'https://assig3chu.wl.r.appspot.com/api/hello';

      const apiUrl = window.location.hostname.includes('localhost')
      ? `${localApiUrl}/${location2}`
      : `${cloudApiUrl}/${location2}`;
    
      //const apiUrl = `http://localhost:2121/api/hello/${location}`;
  
      this.http.get<any>(apiUrl).subscribe
      (
      (response) => 
        {
          this.dataService.receivedData(response);
          this.parentData = '';
          this.receivedResult = true;
        }
      )
    }
  }
  setActiveDTab(tab:string)
  {
    this.activeDTab = tab;
  }
  toggleShowDetails()
  {
    this.showDetailsService.toggleShowDetails();
  }
  clickStar()
  {
    if(this.clickedStar === "currentColor")
    {
      this.clickedStar = "#ffa500";
      let data = {address: this.addr, city: this.cityName, state: this.stateName};
      this.favAPI.sendRecords(data);
    }
    else{
      this.clickedStar = "currentColor";
    }
  }
}

