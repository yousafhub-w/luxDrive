import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms'
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  
})
export class RegisterComponent implements OnInit{

  public signUpForm !: FormGroup;
  public submitted: boolean = false;


  constructor(private formBuilder: FormBuilder, private http : HttpClient, private router: Router, private toast: ToastrService){}

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      fullName:['', Validators.required],
      email:['',[Validators.required, Validators.email]],
      password:['',Validators.required],
      role:["user"],
      status:["active"],
      cart:[[]],
      wishList:[[]],
      orders:[[]]
    })
  }

  signUp(){

     this.submitted = true;

     if (this.signUpForm.invalid) {

      const fullName = this.signUpForm.get('fullName')?.value;
      if(fullName && fullName.length < 5){
        alert('Full Name must be atleast 5 characters long')
      }

      const password = this.signUpForm.get('password')?.value;
    if (password && password.length < 6) {
      alert('Password must be at least 8 characters long');
    }
      return;
     }  

     const email = this.signUpForm.get('email')?.value;

        if (!email.endsWith('@gmail.com')) {
        alert('Only Gmail addresses are allowed for registration');
        return;
        }

     this.http.get<any[]>(`http://localhost:3000/signUpUsers?email=${email}`).subscribe(users => {
      if (users.length > 0) {
        alert('User already exists');
        this.signUpForm.reset();
      } else {
      
      this.http.post<any>('http://localhost:3000/signUpUsers', this.signUpForm.value)
        .subscribe(res => {
          localStorage.setItem('currentUser',JSON.stringify(res));
          this.signUpForm.reset();
          this.toast.success('Successfully registered')
          this.router.navigate(['/']);
        }, err => {
          alert('Something went wrong');
        });
    }
  }, err => {
    alert('Something went wrong');
  });


  

 }
}
