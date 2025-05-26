import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, ChangeDetectorRef} from '@angular/core';
import { FormControl, ReactiveFormsModule, FormGroup, FormsModule, Validators, FormBuilder} from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {debounceTime, switchMap, tap, distinctUntilChanged} from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { PlaceAPIService } from '../place-api.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { UpdateFormService } from '../update-form.service';


@Component({
  selector: 'app-forminput',
  standalone: true,
  imports: [MatInputModule, MatFormFieldModule, MatAutocompleteModule, ReactiveFormsModule, CommonModule, FormsModule, MatSelectModule],
  templateUrl: './forminput.component.html',
  styleUrl: './forminput.component.css'
})
export class ForminputComponent implements OnInit
{
  searchCity = new FormControl();
  searchState = new FormControl();
  predictions: any[] = [];
  state: string = '';
  form!: FormGroup;
  @Output() formSubmitted = new EventEmitter<any>();
  @ViewChild('resetButton', { static: true }) resetButton!: ElementRef<HTMLButtonElement>;
  @ViewChild('submitButton', { static: true }) submitButton!: ElementRef<HTMLButtonElement>;
  disable: boolean = false;

  selectedC: string | null = null;

  stateMapping: { [key: string]: string } = {
    'AL': 'Alabama', 'AK': 'Alaska', 'AZ': 'Arizona', 'AR': 'Arkansas', 'CA': 'California',
    'CO': 'Colorado', 'CT': 'Connecticut', 'DE': 'Delaware', 'FL': 'Florida', 'GA': 'Georgia',
    'HI': 'Hawaii', 'ID': 'Idaho', 'IL': 'Illinois', 'IN': 'Indiana', 'IA': 'Iowa',
    'KS': 'Kansas', 'KY': 'Kentucky', 'LA': 'Louisiana', 'ME': 'Maine', 'MD': 'Maryland',
    'MA': 'Massachusetts', 'MI': 'Michigan', 'MN': 'Minnesota', 'MS': 'Mississippi', 'MO': 'Missouri',
    'MT': 'Montana', 'NE': 'Nebraska', 'NV': 'Nevada', 'NH': 'New Hampshire', 'NJ': 'New Jersey',
    'NM': 'New Mexico', 'NY': 'New York', 'NC': 'North Carolina', 'ND': 'North Dakota', 'OH': 'Ohio',
    'OK': 'Oklahoma', 'OR': 'Oregon', 'PA': 'Pennsylvania', 'RI': 'Rhode Island', 'SC': 'South Carolina',
    'SD': 'South Dakota', 'TN': 'Tennessee', 'TX': 'Texas', 'UT': 'Utah', 'VT': 'Vermont',
    'VA': 'Virginia', 'WA': 'Washington', 'WV': 'West Virginia', 'WI': 'Wisconsin', 'WY': 'Wyoming'
  };

  stateAbb: string[] = Object.keys(this.stateMapping);

  constructor(private cdr: ChangeDetectorRef, private upForm: UpdateFormService,private apiService: PlaceAPIService, private fb: FormBuilder)
  {
    /*this.form.get('inputCity')?.valueChanges.pipe
    (
      debounceTime(300), // Wait for user to stop typing for 300ms
      distinctUntilChanged()).subscribe
      (
        (value) => {this.predictions = this.apiService.getPredictions(value)}
      ) */
  }

  ngOnInit(): void
  {
    this.form = this.fb.group({
      inputStreet: ['',{validators: [Validators.required], updateOn: 'change'}],
      inputCity: ['',{validators: [Validators.required], updateOn: 'change'}],
      inputState: ['',{validators: [Validators.required], updateOn: 'change'}],
      check: []
    })
    this.form.get('inputCity')?.valueChanges.pipe
    (
      debounceTime(300), // Wait for user to stop typing for 300ms
      distinctUntilChanged()).subscribe
      (
        (value) => {this.predictions = this.apiService.getPredictions(value)}
      )
    /*this.form.get('inputCity')?.valueChanges.subscribe((value) => {
        if (typeof value === 'string') {
          this.selectedC = value;
        }
      });*/

      this.upForm.tableData$.subscribe((data) => {
        if (data) {
          this.updateForm(data);;
          console.log("Form updated with table data:", data);
        }
      });
  }

  get f() {
    return this.form.controls;
  }

  citySelect(event: MatAutocompleteSelectedEvent)
  {
    let cityState = event.option.value;
    let replaceSpace = (cityState.state).trimStart();
    this.state = this.getFullState(replaceSpace);
    //this.searchState.setValue(this.state);
    this.form.get('inputState')?.setValue(this.state);
  }

  displayCity(pair: { city: string; state: string }): string {
    return pair ? pair.city : '';
  }

  getFullState(abb: string)
  {
    return this.stateMapping[abb];
  }

  forceDisab(event: Event)
  {
    let checkBox = this.form.get('check');

    if(checkBox)
    {
      console.log("check success");
    }

    if(checkBox?.value === true)
    {
      this.form.get('inputStreet')?.disable();
      this.form.get('inputCity')?.disable();
      this.form.get('inputState')?.disable();
    }
    else
    {
      this.form.get('inputStreet')?.enable();
      this.form.get('inputCity')?.enable();
      this.form.get('inputState')?.enable();
    }
  }

  submitForm()
  {
    if(this.form.valid)
    {
      this.formSubmitted.emit(this.form.value);
    }
  }

  onReset()
  {
    this.form.reset();
    this.form.get('inputStreet')?.enable();
    this.form.get('inputCity')?.enable();
    this.form.get('inputState')?.enable();
    this.formSubmitted.emit(null);
  }

  updateForm(data: any):void
  {
    this.resetButton.nativeElement.click();
    this.form.get('inputStreet')?.patchValue("*", { emitEvent: false });
    data = {city: data.city, state: data.state};
    this.form.get('inputCity')?.patchValue(data, { emitEvent: false });
    console.log("value", this.form.get('inputCity')?.value);
    this.form.get('inputState')?.patchValue(data.state);
    this.submitButton.nativeElement.click();
  
  }
  /*async forceAutocompleteSelection(cityName: string)
  {
    this.form.get('inputCity')?.patchValue(cityName, { emitEvent: true })
    const cityNum = await this.apiService.getPredictions(cityName);
    const selectedOption = cityNum[0];
    console.log("selection:", selectedOption);
  
    if (selectedOption) 
    {
      // Set the value of the form control
      this.form.get('inputCity')?.setValue(selectedOption, { emitEvent: true });

      const mockEvent: MatAutocompleteSelectedEvent = {
        option: {
          value: selectedOption,
          viewValue: `${selectedOption.city}, ${selectedOption.state}`,
        },
      } as MatAutocompleteSelectedEvent;
  
      // Optionally, call the citySelect method manually
      this.citySelect(mockEvent);
    } else {
      console.warn(`City "${cityName}" not found in predictions.`);
    }
  }*/
}
