import { Component, OnInit,Input } from '@angular/core';
import { TmrDataService } from '../tmr-data.service';
import { CommonModule } from '@angular/common';
import { ShowDetailService } from '../show-detail.service';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-day-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './day-view.component.html',
  styleUrl: './day-view.component.css',

})
export class DayViewComponent implements OnInit
{
  constructor(private dataAPI: TmrDataService, private showDetailsService: ShowDetailService){}
  tmrData: any;
  detailData: any;
  @Input() parentData: any;

ngOnInit():void
  {
    this.tmrData = this.dataAPI.getData();
    console.log(this.detailData);
    console.log("hi");
    this.detailData = this.tmrData.data.timelines[0].intervals;
    console.log(this.detailData);
  }

onDateClick(input:number):void
{
  this.dataAPI.receivedClickPage(input);
  this.showDetailsService.toggleShowDetails();
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
}
