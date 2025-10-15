import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit{
    public loginForm!: FormGroup;
    public submitted: boolean = false;

    constructor(private formBuilder : FormBuilder, private http : HttpClient, private router : Router,private toast: ToastrService ){}

    ngOnInit(): void {
      this.loginForm = this.formBuilder.group({
        email:['',[Validators.required,Validators.email]],
        password:['',Validators.required]
      })
    }
    login() {
  this.submitted = true;

  if (this.loginForm.invalid) {
    return;
  }

  this.http.get<any[]>('http://localhost:3000/signUpUsers').subscribe({
    next: (users) => {
      const foundAdmin = users.find(
        (u) =>
          u.email === this.loginForm.value.email &&
          u.password === this.loginForm.value.password &&
          u.role === "admin"
      );
      const checkUser = users.find( v => 
        v.email === this.loginForm.value.email &&
        v.password === this.loginForm.value.password &&
        v.role === "user" 
      )

      const checkStatus = users.find( w =>
        w.status === "inactive"
      )

      if(checkStatus){
        this.toast.error(`User Blocked by Admin`)
        this.router.navigate(['/unauthorised'])

      }else if (checkUser) {
        
        localStorage.setItem('currentUser', JSON.stringify(checkUser));
        this.toast.success(`Login Successful`)
        this.loginForm.reset();
        this.router.navigate(['/']);

      }else if(foundAdmin){
        localStorage.setItem('email', foundAdmin.email)
        localStorage.setItem('role', foundAdmin.role)
        this.router.navigate(['/admin']);
        this.toast.success(`Admin Logged in Successful`);

      }else {
        this.toast.error(`User Not Found`)
        this.loginForm.reset();
        this.submitted = false;
      }
    },
    error: () => {
      alert('Something went wrong ⚠️');
    },
  });
}

}
