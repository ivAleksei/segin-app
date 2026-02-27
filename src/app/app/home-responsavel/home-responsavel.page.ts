import { Component, OnInit } from '@angular/core';
import { I18nService } from 'src/app/_shared/services/i18n.service';
import moment from 'moment';
import { UserService } from 'src/app/_shared/providers/user.service';
import { LocalStorageService } from 'src/app/_shared/services/local-storage.service';
import { MealsService } from 'src/app/_shared/providers/meals.service';
import { NoticesService } from 'src/app/_shared/providers/notices.service';

@Component({
  selector: 'app-home-responsavel',
  templateUrl: './home-responsavel.page.html',
  styleUrls: ['./home-responsavel.page.scss'],
})
export class HomeResponsavelPage implements OnInit {

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
    public noticesService: NoticesService,
    public mealsService: MealsService,
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
  }

  async getMeals() {
    let data = await this.mealsService.getMeals();
    this.meals = data || [];
  }

  async getNotices() {
    let data = await this.noticesService.getNotices();
    this.notices = data || [];
  }

}
