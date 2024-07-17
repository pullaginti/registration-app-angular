import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { NgClass, NgFor } from '@angular/common';

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [NgClass,NgFor],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.scss'
})
export class AdminPageComponent {
  usersList:any=[];
  constructor(private apiService: DataService) { }

ngOnInit() {
    this.apiService.fetchAllUsers().subscribe((response)=>{

      this.usersList = response;
    });
  }

deleteData(id: string){
this.apiService.deleteUser(id).subscribe((response)=>{
  console.log("Here ",response);
  this.ngOnInit();
});
  }
}
