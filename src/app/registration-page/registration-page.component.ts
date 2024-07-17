import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { DataService } from '../data.service';
import * as CryptoJS from 'crypto-js';  
//import { MustMatch } from './_helpers/must-match.validator';
import { MustMatch } from '../helpers/mustMatch';
import { NgClass, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-registration-page',
  standalone: true,
  imports: [ReactiveFormsModule,NgFor,NgIf,NgClass],
  templateUrl: './registration-page.component.html',
  styleUrl: './registration-page.component.scss'
})
export class RegistrationPageComponent {
  registerForm!: FormGroup;
  submitted = false;

  userName: string = '';
  userEmail: string = '';
  userPass: string = '';
  userRepass: string = '';
  plainPass: string = '';
  encryptedPass: string = '';

  constructor(private apiService: DataService,private formBuilder: FormBuilder) { }
  ngOnInit(){
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
  }, {
      validator: MustMatch('password', 'confirmPassword')
  });
  }
 // convenience getter for easy access to form fields
 get userval() { return this.registerForm.controls; }

 onSubmit() {
  console.log("Entering");
     this.submitted = true;

     //stop here if form is invalid
     if (this.registerForm.invalid) {
         return;
     }
     else{
      alert('Registration SUCCESS!! :-)');
      this.userName=this.registerForm.value['name'];
      this.userEmail=this.registerForm.value['email'];
      this.userPass=this.registerForm.value['password'];
      this.userRepass=this.registerForm.value['confirmPassword'];
      //console.log("Here name",this.userName);
      this.encryptPassword();
     }
 }
 
  encryptPassword() {  
    this.plainPass = this.userPass;
    this.encryptedPass = CryptoJS.AES.encrypt(this.plainPass.trim(), 'mysecretkey'.trim()).toString();  
    this.createUser();
        //this.conversionDecryptOutput = CryptoJS.AES.decrypt(this.encryptedPass.trim(), 'secretkey'.trim()).toString(CryptoJS.enc.Utf8);     
  }  



  createUser(){
    const data={
      'name':this.userName,
      'email':this.userEmail,
      'pass':this.encryptedPass
    }
    this.apiService.createUser(data).subscribe(res=>{
      console.log("res",res)
    });
  }


}
