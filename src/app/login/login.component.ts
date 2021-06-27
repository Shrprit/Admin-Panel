import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { BookstoreService } from '../services/bookstore.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  adminForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
    ]),
    password : new FormControl('', [
      Validators.required,
    ]),
  })
  constructor( private auth : AuthService) { }

  ngOnInit(): void {
  }

  login(){
    this.auth.emailSignIn(this.adminForm.value);
  }

  // signup(){
  //   console.log("here");
    
  //   this.auth.emailSignUp({email : "admin@bookstore.com",password : "bookstore"})
  // }
}
