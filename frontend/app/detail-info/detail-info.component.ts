import { Component,OnInit,EventEmitter,Output} from '@angular/core';
import { TmrDataService } from '../tmr-data.service';
import { CommonModule } from '@angular/common';
import { ShowDetailService } from '../show-detail.service';
import { TmrApiService } from '../tmr-api.service';
import { GeoServiceService } from '../geo-service.service';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-detail-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detail-info.component.html',
  styleUrl: './detail-info.component.css',
  //<How to do animation, (2), ChartGPT and Youtube-->
  animations: [
    trigger('slide' , [
        state('false', style({transform: 'translateX(200%)'})),
        state('true', style({translate: 'translateX(0)'})),
        transition('false <=> true', animate('0.01s ease-in-out')),
        transition(':enter', [style({ transform: 'translateX(200%)', opacity: 0 }),
            animate('1s ease-in-out', style({ transform: 'translateX(0)', opacity: 1 })),])

        ])
    ]
})
export class DetailInfoComponent implements OnInit
{
  constructor(private dataAPI:TmrDataService, private showDetailsService: ShowDetailService, private tmrAPI:TmrApiService, private geoAPI:GeoServiceService){}
  tmrData: any;
  detailData: any;
  pgData: any;
  showDetails: boolean = false;

  onListClick() {
    // Toggle the state in the service
    this.showDetailsService.toggleShowDetails();
  }

  ngOnInit():void
  {
    this.pgData = this.dataAPI.getReceivedClickPage();
    this.tmrData = this.dataAPI.getData();
    this.detailData = this.tmrData.data.timelines[0].intervals[this.pgData-1];
  }

  findSymbol(status:String): String
  {
      if (status == '1000')
      {
          return "clear_day";
      }
      else if (status == '1100')
      {
          return "mostly_clear_day";
      }
      else if(status == '1101')
      {
          return "partly_cloudy_day";
      }
      else if(status == '1102')
      {
          return "mostly_cloudy";
      }
      else if(status == '1001')
      {
          return "cloudy";
      }
      else if(status == '1103')
      {
          return "partly_cloudy_day"
      }
      else if(status == '2100')
      {
          return "fog_light"
      }
      else if(status == '2000')
      {
          return "fog"
      }
      else if(status == '2101')
      {
          return "mostly_clear_day"
      }
      else if(status == '4000')
      {
          return "drizzle"
      }
      else if(status == '4200')
      {
          return "rain_light"
      }
      else if(status == '4001')
      {
          return "rain"
      }
      else if(status == '4201')
      {
          return "rain_heavy"
      }
      else if(status == '5001')
      {
          return "flurries"
      }
      else if(status == '5100')
      {
          return "snow_light"
      }
      else if(status == '5000')
      {
          return "snow"
      }
      else if(status == '5101')
      {
          return "snow_heavy"
      }
      else if(status == '6000')
      {
          return "freezing_drizzle"
      }
      else if(status == '6200')
      {
          return "freezing_rain_light"
      }
      else if(status == '6001')
      {
          return "freezing_rain"
      }
      else if(status == '6201')
      {
          return "freezing_rain_heavy"
      }
      else if(status == '7102')
      {
          return "ice_pellets_light"
      }
      else if(status == '7000')
      {
          return "ice_pellets"
      }
      else if(status == '7101')
      {
          return "ice_pellets_heavy"
      }
      else if(status == '8000')
      {
          return "tstorm"
      }

      return "";

  }
  findSymbol2(input:String):String
  {
    let format = input.replace(/_/g, ' ').replace(/day/gi, '').trim();
    format = format.charAt(0).toUpperCase() + format.slice(1);
    return format;
  }
  formatDate(input:any):String
  {
    let date = new Date(input);
    let formatDate = date.toLocaleDateString('en-GB', {weekday: 'long', month: 'short', day: 'numeric', year: 'numeric'});
    let formatDateF = formatDate.replace(/(^\w+)/, '$1,');
    return formatDateF;
  }
  formatDateTime(input:any):String
  {
    let date = new Date(input);
    let formatDate = date.toLocaleTimeString('en-US', {hour: 'numeric', minute: '2-digit'});
    return formatDate;
  }
  tweetText()
  {
    let city;
    let state;

    if(this.tmrAPI.getCity() !== undefined)
    {
        city = this.tmrAPI.getCity();
        state = this.tmrAPI.getState();
    }
    else
    {
        city = this.geoAPI.getCity();
        state = this.geoAPI.getState();
    }
    
    let date = this.detailData.startTime;
    date = this.formatDate(date);
    let temp = this.detailData.values.temperature;
    let condition = this.detailData.values.weatherCode;
    condition = this.findSymbol2(this.findSymbol(condition));
    let text: string;
    text = "The temperature in " + city + ", " + state + " on " + date + " is " + temp + "°F and the conditions are " + condition;
    
    let hashtag = "CSCI571WeatherForecast";
    return `https://twitter.com/intent/tweet?text=${text}&hashtags=${hashtag}`
  }
  tweetHash()
  {
    let hashtag: string;
    hashtag = "CSCI571WeatherForecast";
  }
}
