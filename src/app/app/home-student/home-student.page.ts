import { Component, OnInit } from '@angular/core';
import moment from 'moment';
import { UserService } from 'src/app/_shared/providers/user.service';
import { I18nService } from 'src/app/_shared/services/i18n.service';
import { LocalStorageService } from 'src/app/_shared/services/local-storage.service';
import { NoticesService } from 'src/app/_shared/providers/notices.service';
import { MealsService } from 'src/app/_shared/providers/meals.service';

@Component({
  selector: 'app-home-student',
  templateUrl: './home-student.page.html',
  styleUrls: ['./home-student.page.scss'],
})
export class HomeStudentPage implements OnInit {

  date_ref: any = moment().format('YYYY-MM-DD');
  meals: any = [];
  notices: any = [];
  schedule: any = [
    {
      index: 0,
      date: "2024-05-13",
      start: "07:00",
      end: "08:00",
      _subject: 1,
      _person: 1,
      label: "Leitura",
      subject: {
        name: "Leitura"
      },
      person: {
        name: "Apolônia do Rodrigues"
      }
    },
    {
      index: 0,
      date: "2024-05-13",
      start: "08:00",
      end: "09:30",
      _subject: 1,
      label: "Brincadeiras",
      subject: {
        name: "Brincadeiras"
      },
      person: {
        name: "José de Pedro"
      }
    },
    {
      index: 0,
      date: "2024-05-13",
      start: "09:30",
      end: "10:30",
      _subject: 1,
      label: "Hora da Soneca",
      subject: {
        name: "Hora da Soneca"
      },
      person: {
        name: "Laércio do Rodrigues"
      }
    },
    {
      index: 0,
      date: "2024-05-13",
      start: "10:30",
      end: "12:30",
      _subject: 1,
      label: "A Disposição do CA",
      subject: {
        name: "Socializar"
      },
      person: {
        name: "José de Pedro"
      }
    }
  ];


  constructor(
    public storage: LocalStorageService,
    public userService: UserService,
    public noticesService: NoticesService,
    public mealsService: MealsService,
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
  }

  async getNotices() {
    let data = await this.noticesService.getNotices();
    this.notices = data || [];
  }

  async getMeals() {
    let data = await this.mealsService.getMeals();
    this.meals = data || [];
  }

}
