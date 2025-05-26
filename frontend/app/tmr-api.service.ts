import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TmrApiService 
{
  /*private apiURL = 'http://localhost:2121/api/hello';*/

  constructor(private http: HttpClient) {}

  /*getWeather(address:String): Observable<any>
  {
    console.log("Add:", address);
    return this.http.get<any>(`${this.apiURL}/${address}`)
  }*/
  retLocation:any;
  city:any;
  state:any;
  async getLocation(address:string) 
  {
    let apiKey = '****';
    try
    {
      let response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey}`);

      const jsonResponse = await response.json();
      let count = address.split('+').length - 1;
      console.log("api resonse: ", jsonResponse);
      let lat;
      let lng;
      if(count === 1)
      {
        this.city = jsonResponse.results[0].address_components[0].long_name;
        this.state = jsonResponse.results[0].address_components[2].long_name;
        lat = jsonResponse.results[0].geometry.location.lat;
        lng = jsonResponse.results[0].geometry.location.lng;
      }
      else
      {
        this.city = jsonResponse.results[0].address_components[2].long_name;
        this.state = jsonResponse.results[0].address_components[4].long_name;
        lat = jsonResponse.results[0].geometry.location.lat;
        lng = jsonResponse.results[0].geometry.location.lng;
      }

      if (lat === undefined || lng === undefined) 
      {
        throw new Error('Failed to extract coordinates from the response');
      }

      console.log("Successfully retrieved coordinates:", lat, lng);

      this.retLocation = [lat,lng];
      return[lat,lng];
       
    } 
    catch(error)
    {
      console.error("Error fetching geocoding data:");
      return null;
    }
  }
  getLocation2()
  {
    return this.retLocation;
  }
  getCity()
  {
    return this.city;
  }
  getState()
  {
    return this.state;
  }
}
