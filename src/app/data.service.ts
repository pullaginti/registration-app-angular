import { HttpClient,HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) { }
  API_URL="http://localhost:8000/api";
  fetchAllUsers(){
    return this.http.get(`${this.API_URL}/getAllUsers`)
  }
  createUser(userJson: any){
    return this.http.post(`${this.API_URL}/createUser`,userJson,{ ...Option, responseType: 'text' })
  }
  deleteUser(id:string){
    return this.http.delete(`${this.API_URL}/deleteUser/${id}`,{ ...Option, responseType: 'text' })
  }
}
