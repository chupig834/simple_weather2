import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlaceAPIService 
{

  inputControl = new FormControl('');

  constructor(private http: HttpClient) {};

  getPredictions(input:string) 
  {
    let apiKey = '****';
    let apiUrl = 'https://places.googleapis.com/v1/places:autocomplete';
    let predictionsArray: {city: string, state: string} [] = [];
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    // <how to create body for my http call>, (2), ChartGPT
    const body = {input: input,includedPrimaryTypes: ['(cities)'],languageCode: 'en',};

    const url = `${apiUrl}?key=${apiKey}`;
    this.http.post(url, body, { headers }).subscribe({
      next: (response: any) => 
    {
      let prediction = response.suggestions;
      for(let i = 0; i < 5; i++)
      {
        let result = prediction[i].placePrediction.text.text;
        let parts = result.split(",");
        let city = parts[0];
        let state = parts[1];
        console.log(parts[0]);
        predictionsArray.push({city, state});
      }
    }})

    return predictionsArray;
  }
}
