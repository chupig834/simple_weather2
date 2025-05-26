import { Component, OnInit } from '@angular/core';
import { GeoServiceService } from '../geo-service.service';
import { TmrApiService } from '../tmr-api.service';

@Component({
  selector: 'app-google-map',
  standalone: true,
  imports: [GoogleMapComponent],
  templateUrl: './google-map.component.html',
  styleUrl: './google-map.component.css'
})
export class GoogleMapComponent implements OnInit
{
  map: google.maps.Map | undefined;
  parts:any;
  lat:number = 0;
  lon:number = 0;

  constructor(private geoAPI: GeoServiceService, private tmrAPI: TmrApiService){}

  async initMap(): Promise<void> 
  {
    // The location of Uluru
    const locGeo = await this.geoAPI.getLocation();
    const locGeo2 = await this.tmrAPI.getLocation2();
    if (locGeo !== undefined) 
    {
      this.parts = locGeo.split(',');
      this.lat = Number(this.parts[0])
      this.lon = Number(this.parts[1]);
    }
    else
    {
      this.lat = locGeo2[0];
      this.lon = locGeo2[1];
    }
    const position = { lat: this.lat, lng: this.lon};
    console.log("position:", position);

    try {
      const { Map } = await google.maps.importLibrary('maps') as google.maps.MapsLibrary;
      const { AdvancedMarkerElement } = await google.maps.importLibrary('marker') as google.maps.MarkerLibrary;

      this.map = new Map(document.getElementById('map') as HTMLElement, {
        zoom: 15,
        center: position,
        mapId: 'DEMO_MAP_ID',
      });

      new AdvancedMarkerElement({
        map: this.map,
        position: position,
        title: 'Uluru',
      });

      console.log("check2");
    } catch (error) {
      console.error('Error loading Google Maps libraries:', error);
    }
  }
  ngOnInit()
  {
    this.initMap();
    
  }

  
}
