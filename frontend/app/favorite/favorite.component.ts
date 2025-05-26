import { CommonModule } from '@angular/common';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FavoriteService } from '../favorite.service';
import { UpdateFormService } from '../update-form.service';

@Component({
  selector: 'app-favorite',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favorite.component.html',
  styleUrl: './favorite.component.css'
})
export class FavoriteComponent implements OnInit
{
  constructor(private favAPI:FavoriteService, private formShare:UpdateFormService){}
  maps: any;
  @Output() changeActiveTab = new EventEmitter<string>();

  ngOnInit(): void
  {
    this.getRecord();
    //console.log("maps: ", this.maps);
  }
  getRecord(): void
  {
    this.maps = this.favAPI.getRecords().subscribe
    (
      (response) => {
        this.maps = response;
        console.log("Data received:", this.maps);
      }
    );
    console.log("maps: ", this.maps);
  }
  deleteRecord(index:number)
  {
    console.log("ind", index);
    console.log("map1", this.maps[0]._id);
    console.log("map2", this.maps[1]._id);
    let recID = this.maps[index]._id;
    this.favAPI.delRecords(recID);
    this.maps.splice(index,1);
    //console.log(index);
    
    //this.favAPI.delRecords(recID);

  }

  onRowClick(rowData: any): void 
  {
    console.log("Table row clicked:", rowData);
    this.changeActiveTab.emit("results");
    console.log("switch Form");
    this.formShare.updateFormData(rowData);
  }
}
