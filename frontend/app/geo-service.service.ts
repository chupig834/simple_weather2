import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GeoServiceService 
{
  city: any;
  state: any;
  location: any;

  constructor(private http: HttpClient) {};
  async getGeo() 
  {
    try
    {
      let response = await fetch(`https://ipinfo.io/json?token=****`);

      const jsonResponse = await response.json();
      console.log(jsonResponse);
      this.location = jsonResponse.loc;
      this.city = jsonResponse.city;
      this.state = jsonResponse.region;

      console.log("jsss", this.state);

      if (this.location === undefined) 
      {
        throw new Error('Failed to extract coordinates from the response');
      }

      console.log("Successfully retrieved IP coordinates:", this.location);

      return this.location;
       
    } 
    catch(error)
    {
      console.error("Error fetching geocoding data:");
      return null;
    }
  }
  getState()
  {
    return this.state;
  }
  getCity()
  {
    return this.city;
  }
  getLocation()
  {
    return this.location;
  }
}
