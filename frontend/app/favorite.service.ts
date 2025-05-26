import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  constructor(private http: HttpClient) { }
  map:any;
  mapLen: any;
  private sentmapLen = new BehaviorSubject<any>(0);

  getRecords():Observable<any>
  {
    let localApiUrl = 'http://localhost:8080/api/nice/mapAll';
    let cloudApiUrl = 'https://assig3chu.wl.r.appspot.com/api/nice/mapAll';
  
    let apiUrl = window.location.hostname.includes('localhost')? `${localApiUrl}`: `${cloudApiUrl}`;
    return this.http.get<any>(apiUrl);
  }
  sendRecords(data: { address: string; city: string; state: string }):void
  {
    let localApiUrl = 'http://localhost:8080/api/map';
    let cloudApiUrl = 'https://assig3chu.wl.r.appspot.com/api/map';
    let hi = "cool";
    let apiUrl = window.location.hostname.includes('localhost')? `${localApiUrl}/${hi}`: `${cloudApiUrl}/${hi}`;
    console.log("api:", apiUrl);
    console.log("daata: ", data);
    this.http.post<any>(apiUrl,data).subscribe(
      (response) =>
      {
          console.log(response);
      }
      )
  }
  delRecords(dataID:any):void
  {
    let localApiUrl = 'http://localhost:8080/api/map/del';
    let cloudApiUrl = 'https://assig3chu.wl.r.appspot.com/api/map/del';
    let apiUrl = window.location.hostname.includes('localhost')? `${localApiUrl}/${dataID}`: `${cloudApiUrl}/${dataID}`;
    console.log("api:", apiUrl);
    console.log("daata: ", dataID);
    this.http.delete<any>(apiUrl).subscribe
    (
      (response) =>
      {
          console.log(response);
      }
      )
  }
  recLength(length: number)
  {
    this.mapLen = length;
  }
  getLength()
  {
    return this.mapLen;
  }

  /*getRecords2():any
  {
    this.getRecords().subscribe(
      (response) =>
      {
        this.maps = response;
      }
    );
    return this.map;
  }*/

  /*sendRecords(data: { address: string; city: string; state: string })
  {
    fetch('http://localhost:8080/api/map/map', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          add: data.address,
          city: data.city,
          state: data.state,
      }),
  })
      .then((response) => response.json())
      .then((data) => {
          console.log('Data saved:', data);
      })
      .catch((error) => {
          console.error('Error:', error);
      });
  }*/

}
