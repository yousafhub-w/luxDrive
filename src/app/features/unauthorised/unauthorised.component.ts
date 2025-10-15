import { Component } from '@angular/core';

@Component({
  selector: 'app-unauthorised',
  templateUrl: './unauthorised.component.html'
})
export class UnauthorisedComponent {


     user:any

  constructor(){}

  view(){
     this.user = localStorage.getItem('role')
     console.log(this.user);
     
  }

}
