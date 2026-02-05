import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { I18nService } from '../_shared/services/i18n.service';
import { LocalStorageService } from '../_shared/services/local-storage.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {
  @ViewChild('swiper') swiper: ElementRef | undefined;
  curr_slide: number = 0;
  innerW: any = 0;

  constructor(
    private nav: NavController,
    private storage: LocalStorageService,
    public i18n: I18nService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    let swiper = this.swiper?.nativeElement.swiper;
    swiper.slideTo(0);

    this.timeOutSlideZero();
  }

  ngAfterViewInit() {
    this.storage.set('__welcome_set', true);
  }

  setCurrSlide() {
    let swiper = this.swiper?.nativeElement.swiper;
    this.curr_slide = swiper.activeIndex;

    if (this.curr_slide == 0) {
      this.timeOutSlideZero();
    } else {
      clearTimeout(this.timeout);
    }


  }

  slideNext() {
    if (this.curr_slide == 3) {
      return this.nav.navigateForward('/login-pre');
    }
    let swiper = this.swiper?.nativeElement.swiper;
    swiper.slideNext();
    return;
  }

  timeout: any;

  timeOutSlideZero() {
    this.timeout = setTimeout(() => {
      let swiper = this.swiper?.nativeElement.swiper;
      swiper?.slideTo(1);
    }, 3 * 1000);
  }
}
