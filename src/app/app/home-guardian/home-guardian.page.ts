import { Component, OnInit } from '@angular/core';
import { I18nService } from 'src/app/_shared/services/i18n.service';
import moment from 'moment';
import { UserService } from 'src/app/_shared/providers/user.service';
import { LocalStorageService } from 'src/app/_shared/services/local-storage.service';
import { MealsService } from 'src/app/_shared/providers/meals.service';
import { NoticesService } from 'src/app/_shared/providers/notices.service';
import { AgendaService } from 'src/app/_shared/providers/agenda.service';

@Component({
  selector: 'app-home-guardian',
  templateUrl: './home-guardian.page.html',
  styleUrls: ['./home-guardian.page.scss'],
})
export class HomeGuardianPage implements OnInit {

  date_ref: any = moment().format('YYYY-MM-DD');

  meals: any = [];
  notices: any = [];
  schedule: any = [];


  constructor(
    public storage: LocalStorageService,
    public noticesService: NoticesService,
    public mealsService: MealsService,
    public agendaService: AgendaService,
    public userService: UserService,
    public i18n: I18nService
  ) { }

  ngOnInit() {
    this.setupPage();
  }

  ionViewWillEnter() {
    this.getData();
  }

  setupPage() {
  }

  getData() {
    this.getMeals();
    this.getNotices();
    this.getSchedule();
  }

  async getMeals() {
    let data = await this.mealsService.getMeals();
    this.meals = data || [];
  }

  async getNotices() {
    let data = await this.noticesService.getNotices({}, `
      title
      subtitle
      text
    `);
    this.notices = data || [];
  }

  async getSchedule() {
    let data = await this.agendaService.getAgendas({ date: this.date_ref }, `
      title
      description
      time_start
      time_end
      color
    `);
    this.schedule = data || [];
  }

}
