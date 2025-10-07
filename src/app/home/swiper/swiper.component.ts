import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-swiper',
  templateUrl: './swiper.component.html',
  
})
export class SwiperComponent implements OnInit, OnDestroy{
  slides = [
    { img: 'assets/banner1.png', alt: 'Banner 1' },
    { img: 'assets/banner2.png', alt: 'Banner 2' },
    { img: 'assets/banner3.png', alt: 'Banner 3' },
  ];

  currentSlide = 0;
  private slideInterval: any;

  // ngOnInit() {
  //   // Auto-slide every 3 seconds
  //   this.intervalId = setInterval(() => {
  //     this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  //   }, 3000);
  // }

  // ngOnDestroy() {
  //   clearInterval(this.intervalId);
  // }


  ngOnInit() {
    this.startAutoSlide();
  }

  ngOnDestroy() {
    this.stopAutoSlide();
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    this.restartAutoSlide();
  }

  previousSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
    this.restartAutoSlide();
  }

  goToSlide(index: number) {
    this.currentSlide = index;
    this.restartAutoSlide();
  }

  startAutoSlide() {
    this.slideInterval = setInterval(() => {
      this.nextSlide();
    }, 2000); // Change slide every 5 seconds
  }

  stopAutoSlide() {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
  }

  restartAutoSlide() {
    this.stopAutoSlide();
    this.startAutoSlide();
  }
}

