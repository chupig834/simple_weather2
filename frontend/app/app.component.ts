import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormparentComponent } from './formparent/formparent.component';
import { CommonModule } from '@angular/common';
import { ForminputComponent } from './forminput/forminput.component';
import { WeatherComponent } from './weather/weather.component';
import { TwoPillsComponent } from './two-pills/two-pills.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,FormparentComponent,CommonModule, ForminputComponent,WeatherComponent, TwoPillsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent 
{
  title = 'assig3HW';
  formData: any;

  handleData(data: any)
  {
    this.formData = data;
  }
}
