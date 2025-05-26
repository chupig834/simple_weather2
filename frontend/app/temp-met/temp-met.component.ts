import { Component, OnInit, Input, ViewChild, ElementRef} from '@angular/core';
import Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import WindbarbModule from 'highcharts/modules/windbarb';
import { TmrDataService } from '../tmr-data.service';
import { HighchartsChartModule } from 'highcharts-angular';
import StockModule from 'highcharts/modules/stock';

if (typeof Highcharts === 'object') {
  HighchartsMore(Highcharts);
  WindbarbModule(Highcharts);
  StockModule(Highcharts);
}

@Component({
  selector: 'app-temp-met',
  standalone: true,
  imports: [HighchartsChartModule],
  templateUrl: './temp-met.component.html',
  styleUrl: './temp-met.component.css'
})
export class TempMetComponent implements OnInit
{
  precipitations: any[] = [];
  precipitationsError: any[] = [];
  winds: any[] = [];
  temperatures: any[] = [];
  pressures: any[] = [];
  dataApi: any;
  dataApi2: any;
  chart?: Highcharts.Chart;
  container!: HTMLElement;

  Highcharts: typeof Highcharts = Highcharts; 
  chartOptions: Highcharts.Options = {};
  @ViewChild('chartContainer', { static: false }) containerRef!: ElementRef;

  @Input() parentData: any;

  constructor(private tmrData:TmrDataService){}

  ngOnInit(): void 
  {
    this.dataApi = this.tmrData.getData();
    this.dataApi2 = this.dataApi.data.timelines[1];
    console.log("met");
    console.log(this.dataApi2);
    Highcharts.setOptions({time: {useUTC: false}});
    //this.parseYrData();
  }

  ngAfterViewInit(): void {
    this.container = this.containerRef?.nativeElement;
    this.parseYrData();
  }

  parseYrData()
  {
    for(let interval of this.dataApi2.intervals)
    {
      let time = Date.parse(interval.startTime);
      let temp = interval.values.temperature;
      let humidity = interval.values.humidity;
      let pressure = interval.values.pressureSeaLevel;
      let windSpeed = interval.values.windSpeed;
      let windDirection = interval.values.windDirection;
      
      this.temperatures.push({x: time, y: temp});
      this.precipitations.push({ x: time, y: Math.round(humidity) });
      this.winds.push({ x: time, value: windSpeed, direction: windDirection });
      this.pressures.push({ x: time, y: Math.round(pressure) });
    };

    this.creationChart();

  }
  
  creationChart(): void
  {
    this.chart = Highcharts.chart(this.container, this.getChartOptions());
    this.onChartLoad(this.chart);
  }

  onChartLoad(chart: Highcharts.Chart):void
  {
    this.drawBlocksForWindArrows(chart);
  }

  drawBlocksForWindArrows(chart: Highcharts.Chart):void
  {
    const xAxis = chart.xAxis[0];

    for (let pos = xAxis.min ?? 0, max = xAxis.max ?? 0, i = 0; pos <= max + 36e5; pos += 36e5, i += 1) 
    {
      // Determine if this is the last position
      const isLast = pos === max + 36e5;
      const x = Math.round(xAxis.toPixels(pos) ?? 0) + (isLast ? 0.5 : -0.5);
      console.log("x:", x);
  
      // Determine if it's a long tick or short tick
      const resolution = 36e5;
      const isLong = resolution > 36e5 ? pos % resolution === 0 : i % 2 === 0;
  
      // Draw the vertical dividers and ticks
      const path: Highcharts.SVGPathArray = [
        ['M', x, chart.plotTop + chart.plotHeight + (isLong ? 0 : 28)],
        ['L', x, chart.plotTop + chart.plotHeight + 20],
        ['Z'],
      ];
      chart.renderer
        .path(path)
        .attr({
          stroke: chart.options.chart?.plotBorderColor ?? '#000',
          'stroke-width': 1,
        })
        .add();
    }
  
    // Center items in the block
    const windbarbs = chart.get('windbarbs') as Highcharts.Series & { markerGroup?: Highcharts.SVGElement };

    if (windbarbs?.markerGroup) {

        //<Translating codes from js to ts>, (2), ChartGPT 
        const currentX = (windbarbs.markerGroup.attr('translateX') as number) ?? 0;
        const currentY = (windbarbs.markerGroup.attr('translateY') as number) ?? 0;

        windbarbs.markerGroup.translate(currentX + 8, currentY);
      };
    

  }
  getChartOptions(): Highcharts.Options 
  {
    return {
      chart: {
        renderTo: this.container,
        marginBottom: 70,
        marginRight: 40,
        marginTop: 50,
        plotBorderWidth: 1,
        height: 500,
        scrollablePlotArea: { minWidth: 720 },
      },
      defs: {
        patterns: [{
        id: 'precipitation-error',
        path: {
            d: [
                'M', 3.3, 0, 'L', -6.7, 10,
                'M', 6.7, 0, 'L', -3.3, 10,
                'M', 10, 0, 'L', 0, 10,
                'M', 13.3, 0, 'L', 3.3, 10,
                'M', 16.7, 0, 'L', 6.7, 10
            ].join(' '),
            stroke: '#68CFE8',
            strokeWidth: 1
        }
        },]as Highcharts.PatternOptionsObject[],
        }as Highcharts.DefsOptions,
      title: {
        text: 'Hourly Weather (For Next 5 Days)',
        align: 'center',
      },
      tooltip: {
        shared: true,
        useHTML: true,
        headerFormat:
            '<small>{point.x:%A, %b %e, %H:%M} - ' +
            '{point.point.to:%H:%M}</small><br>'
      },
      xAxis: [
        {
          type: 'datetime',
          tickInterval: 6 * 36e5,
          minorTickInterval: 36e5,
          labels: { format: '{value:%H}' },
          crosshair: true,
          tickLength: 0,
          gridLineWidth: 1,
          gridLineColor: 'rgba(128, 128, 128, 0.1)',
          startOnTick: false,
          endOnTick: false,
          minPadding: 0,
          maxPadding: 0,
          offset: 30
        }, 
        {
          linkedTo: 0,
          type: 'datetime',
          tickInterval: 24 * 3600 * 1000,
          labels: {
            format: '{value:<span style="font-size: 12px; font-weight: bold">%a</span> %b %e}',
            align: 'left',
          },
          opposite: true,
        },
      ],
      yAxis: [
        {
          title:{text:null},
          labels: { format: '{value}°', style: {fontSize: '10px'}, x:-3 },
          plotLines: [{ value: 0, color: '#BBBBBB', width: 1, zIndex:2}],
          maxPadding: 0.3,
          minRange: 8,
          tickInterval:10,
          min: 0,
          max:100,
          gridLineColor: 'rgba(128, 128, 128, 0.1)'
        },
        {
          title:{text:null},
          labels: { enabled: false },
          gridLineWidth: 0,
          tickLength:0,
          minRange:10,
          min:0
        },
        {
          allowDecimals: false,
          title: { text: 'inHg', style: { color: 'orange', fontSize: '10px' }, offset:0, align: 'high', rotation: 0, textAlign:'left', x: 3  },
          labels: { style: { color: 'orange', fontSize: '8px' }, y:2, x:3 },
          opposite: true,
          gridLineWidth: 0,
          showLastLabel: false,
          min:29,
          max:32,
          tickInterval:1,
          startOnTick: false,
          endOnTick:false
        }],
        legend: {
          enabled: false
        },
        plotOptions:{
          series:
          {
            pointPlacement: 'between'
          }
        },
      series: [
        {
          name: 'Temperature',
          data: this.temperatures,
          type: 'spline',
          marker: {
            enabled: false,
            states: {
                hover: {
                    enabled: true
                }
            }
        },
        tooltip: {
            pointFormat: '<span style="color:{point.color}">\u25CF</span>' +
                ' ' +
                '{series.name}: <b>{point.y}°F</b><br/>'
        },
          color: '#FF3333',
          zIndex: 1,
          showInLegend: false,
          negativeColor: '#48AFE8'
        },
        {
          name: 'Precipitation',
          data: this.precipitationsError,
          type: 'column',
          color: 'url(#precipitation-error)',
          yAxis: 1,
          groupPadding: 0,
          pointPadding: 0,
          tooltip: {
              valueSuffix: ' mm',
              pointFormat: '<span style="color:{point.color}">\u25CF</span>' +
                  ' ' +
                  '{series.name}: <b>{point.minvalue} mm - ' +
                  '{point.maxvalue} mm</b><br/>'
          },
          grouping: false,
          dataLabels: 
          {
            filter: {
            operator: '>',
            property: 'maxValue',
            value: 0
          },
          style: {
            fontSize: '8px',
            color: 'gray'
          }
         }
        },
        {
          name: 'Humidity',
          data: this.precipitations,
          type: 'column',
          color: '#68CFE8',
          yAxis: 1,
          groupPadding:0,
          pointPadding:0,
          grouping: false,

          showInLegend: false,
          dataLabels: {
            enabled: true,
            filter: {
                operator: '>',
                property: 'y',
                value: 0
            },
            style: {
                fontSize: '8px',
                color: '#666'
            }
        },
          tooltip: {
            valueSuffix: ' %'
            }
        },
        {
          name: 'Air Pressure',
          data: this.pressures,
          type: 'line',
          color: 'orange',
          marker: {
            enabled: false
          },
          shadow: false,
          tooltip: {
            valueSuffix: ' inHg'
          },
          dashStyle: 'ShortDot',
          yAxis: 2,
          showInLegend: false,
        },
        {
          name: 'Wind',
          type: 'windbarb',
          data: this.winds,
          showInLegend: false,
          color: 'red',
          lineWidth: 1.5,
          vectorLength: 10,
          yOffset: -20,
          xOffset: 0,
          tooltip: {
              valueSuffix: ' mph'
          },
          dataGrouping: {
        		enabled: true,
        		forced: true,
        		units: [['hour', [2]]]  // Group by 2 hours
          }
        },
      ],
    };
  }

}
