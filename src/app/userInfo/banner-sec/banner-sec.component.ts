import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Carousel } from 'src/app/model/carousel.model';

@Component({
  selector: 'app-banner-sec',
  templateUrl: './banner-sec.component.html',
  styleUrls: ['./banner-sec.component.scss']
})
export class BannerSecComponent implements OnInit {
  carousels: Carousel[] = [];
  showLoader: boolean = false;
  isLoggedIn: boolean |undefined;
  name: any | undefined;
  constructor(
    // private clientService: ClientService,
    private viewportScroller: ViewportScroller
  ) {}

  ngOnInit(): void {
    if(localStorage.getItem('userid')) {
      this.isLoggedIn=true;
      this.name = localStorage.getItem('fullName');
    }
    // this.getCarousel();
  }

  // public getCarousel() {
  //   this.showLoader = true;
  //   this.clientService.listAllCarousels().subscribe({
  //     next: (response: any) => {
  //       this.carousels = response.carousels;
  //     }, complete: () => {
  //       this.showLoader = false;
  //     }
  //   });
  // }

  getActiveClass(i: any) {
    if (i == 0) return ' active';
    else return ' ';
  }

  getIndex(i: any) {
    return i;
  }

  public scrollToAnchroingPosition(elementId: string): void {
    this.viewportScroller.scrollToAnchor(elementId);
  }
}
