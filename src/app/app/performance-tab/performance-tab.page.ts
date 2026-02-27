import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { AlertsService } from 'src/app/_shared/services/alerts.service';
import { LoadingService } from 'src/app/_shared/services/loading.service';
import { UtilsService } from 'src/app/_shared/services/utils.service';
import { environment } from 'src/environments/environment';
import { I18nService } from 'src/app/_shared/services/i18n.service';
import { LocalStorageService } from 'src/app/_shared/services/local-storage.service';
import { NavController } from '@ionic/angular';
import moment from 'moment';

@Component({
  selector: 'app-performance-tabs',
  templateUrl: './performance-tab.page.html',
  styleUrls: ['./performance-tab.page.scss'],
})
export class PerformanceTabPage implements OnInit {
  @ViewChild('swiper') swiperRef: ElementRef | undefined;
  curr_slide: number = 0;
  person: any;
  year: any = moment().format('YYYY');

  periods: any = [
    {year: "2025", label: "1o Bimestre", period: "2025.1", class:"Infantil"},
    {year: "2025", label: "2o Bimestre", period: "2025.2", class:"Infantil"},
    {year: "2025", label: "3o Bimestre", period: "2025.3", class:"Infantil"},
    {year: "2025", label: "4o Bimestre", period: "2025.4", class:"Infantil"},
    {year: "2026", label: "1o Bimestre", period: "2026.1", class:"Infantil"},
    {year: "2026", label: "2o Bimestre", period: "2026.2", class:"Infantil"},
    {year: "2026", label: "3o Bimestre", period: "2026.3", class:"Infantil"},
    {year: "2026", label: "4o Bimestre", period: "2026.4", class:"Infantil"},
  ]

  constructor(
    public utils: UtilsService,
    public storage: LocalStorageService,
    public nav: NavController,
    public i18n: I18nService
  ) { }

  ngOnInit() {
    this.setupPage();
  }

  setupPage() {
  }

  ionViewWillEnter() {
  }


  setCurrSlide() {
    let swiper = this.swiperRef?.nativeElement.swiper;
    this.curr_slide = swiper.activeIndex;

  }

  setSlide(index) {
    let swiper = this.swiperRef?.nativeElement.swiper;
    swiper?.slideTo(index);
    this.curr_slide = index;
  }
}
