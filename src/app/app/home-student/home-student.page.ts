import { Component, OnInit } from '@angular/core';
import moment from 'moment';
import { UserService } from 'src/app/_shared/providers/user.service';
import { I18nService } from 'src/app/_shared/services/i18n.service';
import { LocalStorageService } from 'src/app/_shared/services/local-storage.service';
import { NoticesService } from 'src/app/_shared/providers/notices.service';
import { MealsService } from 'src/app/_shared/providers/meals.service';
import { AgendaService } from 'src/app/_shared/providers/agenda.service';

@Component({
  selector: 'app-home-student',
  templateUrl: './home-student.page.html',
  styleUrls: ['./home-student.page.scss'],
})
export class HomeStudentPage implements OnInit {

  date_ref: any = moment().format('YYYY-MM-DD');
  meals: any = [];
  notices: any = [];
  schedule: any = [];


  constructor(
    public storage: LocalStorageService,
    public userService: UserService,
    public noticesService: NoticesService,
    public mealsService: MealsService,
    public agendaService: AgendaService,
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
    this.getNotices();
    this.getMeals();
    this.getSchedule();
  }

  async getNotices() {
    let data = await this.noticesService.getNotices({}, `
      title
      subtitle
      text
    `);
    this.notices = data || [];
  }

  async getMeals() {
    let data = await this.mealsService.getMeals({}, `
      name
      text
      start
      img
    `);
    this.meals = data || [];
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
