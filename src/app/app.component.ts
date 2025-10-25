import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  isLoading = true;

  ngOnInit(): void {
    // Simulate loading time (2 seconds)
    setTimeout(() => {
      this.isLoading = false;
    }, 200);
  }
}
