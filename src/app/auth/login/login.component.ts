import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit{
    public loginForm!: FormGroup;
    public submitted: boolean = false;

    constructor(private formBuilder : FormBuilder, private http : HttpClient, private router : Router ){}

    ngOnInit(): void {
      this.loginForm = this.formBuilder.group({
        email:['',[Validators.required,Validators.email]],
        password:['',Validators.required]
      })
    }
    login(){

      this.submitted = true;

      if(this.loginForm.invalid){
        return;
      }
      this.http.get<any>('http://localhost:3000/signUpUsers')
      .subscribe(res =>{
        const user = res.find((a:any)=>{
          return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password
        });
        if(user){
          alert('Login Success');
          this.loginForm.reset();
          this.router.navigate(['home'])
        }else{
          alert('user not found')
          this.loginForm.reset();
          this.submitted = false;
        }
      },err =>{
        alert('Something went wrong')
      })
    }
}
