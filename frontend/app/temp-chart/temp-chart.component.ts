import { Component, OnInit, Input } from '@angular/core';
import Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
//import ArearangeModule from 'highcharts/es-modules/Series/Arearange/ArearangeSeries.js';

import { TmrDataService } from '../tmr-data.service';
import { HighchartsChartModule } from 'highcharts-angular';

if (typeof Highcharts === 'object') {
  HighchartsMore(Highcharts);
}

@Component({
  selector: 'app-temp-chart',
  standalone: true,
  imports: [HighchartsChartModule],
  templateUrl: './temp-chart.component.html',
  styleUrl: './temp-chart.component.css'
})
export class TempChartComponent implements OnInit
{
  constructor(private tmrData:TmrDataService){}
  Highcharts: typeof Highcharts = Highcharts; 
  chartOptions: Highcharts.Options = {};
  @Input() parentData: any;

  dataH: any[] = []; // Replace with your actual data
  dataMax: any[] = []; // Replace with your actual max temperature data
  dataMin: any[] = []; // Replace with your actual min temperature data
  dataApi: any;
  dataApi2: any;

  ngOnInit(): void {
    this.dataApi = this.tmrData.getData();
    this.dataApi2 = this.dataApi.data.timelines[0];

    console.log(this.dataApi2);

    for(let i = 0; i < 6; i++)
    {
      let date = this.dataApi2.intervals[i].startTime;
      let min = this.dataApi2.intervals[i].values.temperatureMin;
      let max = this.dataApi2.intervals[i].values.temperatureMax;

      let dateF = Date.parse(date);
      this.dataH.push([dateF, min, max]);
    }

    this.dataMin = this.dataH.map(function(val) {return [val[0], val[1]];});
    this.dataMax = this.dataH.map(function(val) {return [val[0], val[2]];});
    const xValues = this.dataMin.map(point => point[0]);
    this.initializeChart();
  }

  initializeChart() 
  {
    Highcharts.setOptions({
      time: {
        useUTC: false,
      },
    });

    this.chartOptions = {
      chart: {
        type: 'arearange',
        height:500,
        width:null
      },
      title: {
        text: 'Temperature Ranges (Min, Max)',
      },
      legend: {
        enabled: false,
      },
      xAxis: {
        type: 'datetime',
        dateTimeLabelFormats: { day: '%b-%e' },
        crosshair: {
          color: 'gray',
          width: 1,
          dashStyle: 'Dot',
        },
      },
      yAxis: {
        title: { text: null },
      },
      tooltip: {
        shared: true,
        formatter: function () {
          const symbol = '●';
          const min = this.points?.find((point) => point.series.name === 'Min');
          const max = this.points?.find((point) => point.series.name === 'Max');
          const date = new Date(this.x ?? 0);
          const options: Intl.DateTimeFormatOptions = {
            weekday: 'long',
            month: 'short',
            day: 'numeric',
          };
          const dateF = date.toLocaleDateString('en-US', options);

          return `<span style="font-size: 12px; margin-bottom: 10px;">${dateF}</span><br>
                  <span style="color: #1ba0fb;">${symbol}</span> Temperature: 
                  <span style="font-weight: bold;">${min?.y}°F - ${max?.y}°F</span>`;
        },
      },
      series: [
        {
          type: 'arearange',
          data: this.dataH,
          fillColor: {
            linearGradient: 
            {
              x1: 0,
              y1: 0,
              x2: 0,
              y2: 1,
            },
            stops: [
              [0, '#FFA500'],
              [1, '#ADD8E6'],
            ],
          },
          tooltip: { pointFormat: ''},
        },
        {
          name: 'Max',
          type: 'line',
          data: this.dataMax,
          color: '#FFA500',
          marker: { symbol: 'circle', fillColor: '#1ba0fb', radius: 5 },
          tooltip: { pointFormat: '' },
        },
        {
          name: 'Min',
          type: 'line',
          data: this.dataMin,
          color: '#FFA500',
          marker: { symbol: 'circle', fillColor: '#1ba0fb', radius: 5 },
          tooltip: { pointFormat: ''},
        },
      ],
    };
  }

  

  


  
}

