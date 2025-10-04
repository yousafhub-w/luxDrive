import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms'
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  
})
export class RegisterComponent implements OnInit{

  public signUpForm !: FormGroup;
  public submitted: boolean = false;

  constructor(private formBuilder: FormBuilder, private http : HttpClient, private router: Router){}

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      fullName:['', Validators.required],
      email:['',[Validators.required, Validators.email]],
      password:['',Validators.required]
    })
  }

  signUp(){

     this.submitted = true;

     if (this.signUpForm.invalid) {
        return;
     }  
     this.http.post<any>('http://localhost:3000/signUpUsers',this.signUpForm.value)
    .subscribe(res =>{
      // alert('SignUp Successfull')
      this.signUpForm.reset()
      this.router.navigate(['home'])
    },err =>{
      alert('Something went wrong')
    })
  }

}
