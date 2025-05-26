import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { ForminputComponent } from '../forminput/forminput.component';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-formparent',
  standalone: true,
  imports: [ForminputComponent, CommonModule],
  templateUrl: './formparent.component.html',
  styleUrl: './formparent.component.css'
})
export class FormparentComponent {
  @Output() dataToGrandparent = new EventEmitter<any>();

  onFormSubmitted(data: any) {
    this.dataToGrandparent.emit(data);
  }

  }
