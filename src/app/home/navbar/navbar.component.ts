import { Component, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  
  dropDown:boolean = false;
  constructor(private eRef: ElementRef) {}

  toggleDropdown(){
    this.dropDown = !this.dropDown;
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: Event) {
    // If the click is outside this component, close dropdown
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.dropDown = false;
    }
  }
}
