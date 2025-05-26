import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-place-api',
  standalone: true,
  imports: [],
  templateUrl: './place-api.component.html',
  styleUrl: './place-api.component.css'
})
export class PlaceAPIComponent
{

  inputControl = new FormControl('');

  constructor(private http: HttpClient) {};
  private apiKey = '****';
  private apiUrl = 'https://places.googleapis.com/v1/places:autocomplete';

  getPredictions(input:string) 
  {
    let predictionsArray: string[] = [];
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const body = {
      input: input,
      includedPrimaryTypes: ['(cities)'],
      anguageCode: 'en',
    };

    const url = `${this.apiUrl}?key=${this.apiKey}`;

    this.http.post(url, body, { headers }).subscribe({
      next: (response: any) => 
    {
      const prediction = response.suggestions;
      for(let i = 0; i < 5; i++)
      {
        predictionsArray.push(prediction[i].placePrediction.text.text);
      }
    }})

    return predictionsArray;
  }
}

