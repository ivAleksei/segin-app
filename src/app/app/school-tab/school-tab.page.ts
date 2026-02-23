import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
// import { FullCalendarComponent } from '@fullcalendar/angular';
import { NavController } from '@ionic/angular';
import { I18nService } from 'src/app/_shared/services/i18n.service';
import { LocalStorageService } from 'src/app/_shared/services/local-storage.service';
import { UtilsService } from 'src/app/_shared/services/utils.service';

@Component({
  selector: 'app-school-tab',
  templateUrl: './school-tab.page.html',
  styleUrls: ['./school-tab.page.scss'],
})
export class SchoolTabPage implements OnInit {
  // @ViewChild("calendar") calendar: FullCalendarComponent;

  @ViewChild('swiper') swiperRef: ElementRef | undefined;
  curr_slide: number = 0;
  person: any;
  notices: any = [
    { title: "Feriado Municipal", subtitle: "Feriado dia 08/01/2026", text: "Informamos que as atividades escolares serão encerradas as 12h00 do dia 08/01/2026, pois será realizada uma detetização." },
    { title: "Detetização", subtitle: "Feriado dia 08/01/2026", text: "Informamos que as atividades escolares serão encerradas as 12h00 do dia 08/01/2026, pois será realizada uma detetização." },
    { title: "Passeio", subtitle: "Feriado dia 08/01/2026", text: "Informamos que as atividades escolares serão encerradas as 12h00 do dia 08/01/2026, pois será realizada uma detetização." }
  ];

  calendarOptions: any = Object.assign({}, this.utils.calendarOptions, {
    // datesSet: ev => this.setDateRef({ dateStr: ev.startStr.substring(0, 7) }),
    // dateClick: ev => this.setDateRef(ev)
  });

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
    this.getPerson();
  }

  async getPerson() {
    this.person = await this.storage.get('person');
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
