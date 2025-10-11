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
      // ✅ Find the single user that matches email & password
      const foundUser = users.find(
        (u) =>
          u.email === this.loginForm.value.email &&
          u.password === this.loginForm.value.password
      );

      if (foundUser) {
        // ✅ Store single user (not array)
        localStorage.setItem('currentUser', JSON.stringify(foundUser));

        this.toast.success(`Login Successful`)
        this.loginForm.reset();
        this.router.navigate(['/']);
      } else {
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
