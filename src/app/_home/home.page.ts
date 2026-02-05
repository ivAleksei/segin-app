import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { I18nService } from '../_shared/services/i18n.service';
import moment from 'moment';
import * as $ from 'jquery';
import { EventsService } from '../_shared/providers/events.service';
import { EventSubscriptionsService } from '../_shared/providers/event-subscriptions.service';
import { LoadingService } from '../_shared/services/loading.service';
import { LocalStorageService } from '../_shared/services/local-storage.service';
import { AthletesService } from '../_shared/providers/athletes.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild('swiper') swiperRef: ElementRef | undefined;

  person: any;
  filter: any = {
    month: moment().format('YYYY-MM')
  };
  month_select: boolean = false;
  curr_slide: any = 0;
  arr_events: any = [];
  arr_subscriptions: any = [];

  constructor(
    private eventSubscriptionsService: EventSubscriptionsService,
    private storage: LocalStorageService,
    private loadingService: LoadingService,
    private athletesService: AthletesService,
    private eventsService: EventsService,
    public i18n: I18nService
  ) { }

  ngOnInit() {
    this.setupPage();
  }

  setupPage() {
    this.getData();
  }

  ionViewWillEnter() {
    console.log('WillEnter');
    
    this.getData();
  }

  async getData() {
    this.getEvents();
    await this.getPerson();
    this.getSubscriptions();
  }
  async getPerson() {
    let _person = await this.storage.get('user_id');
    let data = await this.athletesService.getAthleteById({ _id: _person }, `
      avatar{
        url
      }
      name
      short_name
      club{
        name
      }
      address{
        city
        state
        country
      }
  `);
    this.person = data || null;
    if (!this.person) return;

    if (!this.person?.avatar) {
      let split = this.person.short_name.split(' ');
      let ini = split[0][0].toLocaleLowerCase() + split[1][0].toLocaleUpperCase()
      this.person.avatar = {
        url: `https://dummyimage.com/128x128/000/fff/?text=${ini}`
      }
    }

    this.person.location_str = [this.person?.address?.city, this.person?.address?.state, this.person?.address?.country].filter(it => it).join(', ')
  }

  async getEvents() {
    let query = { month: this.filter.month || {} };
    this.loadingService.show();
    let data = await this.eventsService.getEvents(query, `
      name
      dt_start
      location
      banner{
        url
      }
    `);
    this.arr_events = (data || []).map(it => {
      it.img = it?.banner?.url || '/assets/imgs/event-template.png';
      return it;
    });
    this.loadingService.hide();
  }


  async getSubscriptions() {
    if (!this.person?._id) return;
    let data = await this.eventSubscriptionsService.getEventSubscriptions({
      _person: this.person._id
    }, `
      _event
      _race
      name
      category
      pos
      status
      event{
        name
        dt_start
      }
      race{
        name
        dt_start
      }
    `);
    this.arr_subscriptions = data || [];
  }

  // SWIPER
  setCurrSlide() {
    let swiper = this.swiperRef?.nativeElement.swiper;
    this.curr_slide = swiper.activeIndex;

  }

  setSlide(index) {
    let swiper = this.swiperRef?.nativeElement.swiper;
    swiper?.slideTo(index);
    this.curr_slide = index;
  }

  // CALENDAR
  toggleSelectMonth() {
    this.month_select = !this.month_select;
  }

  setMonth(ev: any) {
    let month = moment(ev?.target?.value).format('YYYY-MM');

    if (month != this.filter.month) {
      this.filter.month = month;
      this.getEvents();
      this.month_select = false;
    }
  }

  nextMonth() {
    let month = moment(this.filter.month, 'YYYY-MM').add(1, 'month').format('YYYY-MM');
    this.setMonth({ target: { value: month } });
  }
  prevMonth() {
    let month = moment(this.filter.month, 'YYYY-MM').subtract(1, 'month').format('YYYY-MM');
    this.setMonth({ target: { value: month } });
  }

}
