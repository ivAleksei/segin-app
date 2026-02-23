import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
// import { FullCalendarComponent } from '@fullcalendar/angular';
import { NavController } from '@ionic/angular';
import moment from 'moment';
import { NoticesService } from 'src/app/_shared/providers/notices.service';
import { I18nService } from 'src/app/_shared/services/i18n.service';
import { LocalStorageService } from 'src/app/_shared/services/local-storage.service';
import { UtilsService } from 'src/app/_shared/services/utils.service';

@Component({
  selector: 'app-school-tab',
  templateUrl: './school-tab.page.html',
  styleUrls: ['./school-tab.page.scss'],
})
export class SchoolTabPage implements OnInit {
  @ViewChild("calendar") calendar: FullCalendarComponent;

  @ViewChild('swiper') swiperRef: ElementRef | undefined;
  curr_slide: number = 0;
  person: any;
  notices: any = [];
  raw_events: any = [
    { title: "Feriado Municipal", subtitle: "Feriado dia 08/01/2026", start: "2026-02-15" },
    { title: "Detetização", subtitle: "Feriado dia 08/01/2026", start: "2026-02-21" },
    { title: "Passeio", subtitle: "Feriado dia 08/01/2026", start: "2026-02-21" }
  ];
  list_events: any = [];

  date_ref: any = moment().format('YYYY-MM-DD')
  map_events: any = {};

  calendarOptions: any = Object.assign({}, this.utils.calendarOptions, {
    eventDisplay: "auto",
    // datesSet: ev => this.setDateRef({ dateStr: ev.startStr.substring(0, 7) }),
    dateClick: ev => this.setDateRef(ev)
  });

  constructor(
    public utils: UtilsService,
    private noticesService: NoticesService,
    public storage: LocalStorageService,
    public nav: NavController,
    public i18n: I18nService
  ) { }

  ngOnInit() {
    this.setupPage();
  }

  setupPage() {
    this.getPerson();
    this.getNotices();
    this.getEvents();
  }

  async getNotices() {
    let data = await this.noticesService.getNotices();
    this.notices = data || [];
  }
  
  async getPerson() {
    this.person = await this.storage.get('person');
  }

  async getEvents() {
    let map_events = {};

    for (let it of (this.raw_events || [])) {
      if (!map_events[it.start]) map_events[it.start] = 0;

      map_events[it.start]++;
    }

    this.map_events = map_events || {};
    let events_calendar = Object.keys(map_events || {}).map(it => {
      return {
        title: '',
        start: it,
        display: 'list-item',
      }
    })
    this.setEventsCalendar(events_calendar);
    this.setEvents();
  }

  setEvents() {
    this.list_events = (this.raw_events || []).filter(it => it.start == this.date_ref);
  }

  ionViewWillEnter() {
  }


  setCurrSlide() {
    let swiper = this.swiperRef?.nativeElement.swiper;
    this.curr_slide = swiper.activeIndex;

  }

  setDateRef(ev) {
    this.date_ref = ev?.dateStr || moment().format('YYYY-MM-DD');
    this.setEvents();
  }

  setSlide(index) {
    let swiper = this.swiperRef?.nativeElement.swiper;
    swiper?.slideTo(index);
    this.curr_slide = index;
  }

  setEventsCalendar(arr) {
    this.calendarOptions.events = [...(arr || [])];
    let calendarApi = this.calendar?.getApi();
    if (calendarApi)
      calendarApi.addEventSource({ events: this.calendarOptions.events });
  }
}
