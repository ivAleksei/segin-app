import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AgendaService } from 'src/app/_shared/providers/agenda.service';
import { I18nService } from 'src/app/_shared/services/i18n.service';
import moment from 'moment';

@Component({
  selector: 'app-agenda-tab',
  templateUrl: './agenda-tab.page.html',
  styleUrls: ['./agenda-tab.page.scss'],
})
export class AgendaTabPage implements OnInit {

  date_ref: string = moment().format('YYYY-MM-DD');
  date_label: string = 'Hoje';
  list_events: any[] = [];

  constructor(
    public nav: NavController,
    public i18n: I18nService,
    private agendaService: AgendaService,
  ) { }

  ngOnInit() { }

  ionViewWillEnter() {
    this.loadEvents();
  }

  updateDateLabel() {
    const today = moment().format('YYYY-MM-DD');
    if (this.date_ref === today) this.date_label = 'Hoje';
    else if (this.date_ref === moment().add(1, 'day').format('YYYY-MM-DD')) this.date_label = 'Amanhã';
    else if (this.date_ref === moment().subtract(1, 'day').format('YYYY-MM-DD')) this.date_label = 'Ontem';
    else this.date_label = moment(this.date_ref).format('D [de] MMMM');
  }

  async loadEvents() {
    this.updateDateLabel();
    const data: any = await this.agendaService.getAgendas(
      { date: this.date_ref },
      'title description date time_start time_end type color all_day'
    );
    this.list_events = (data || []).sort((a, b) => {
      if (!a.time_start) return 1;
      if (!b.time_start) return -1;
      return a.time_start.localeCompare(b.time_start);
    });
  }

  prevDay() {
    this.date_ref = moment(this.date_ref).subtract(1, 'day').format('YYYY-MM-DD');
    this.loadEvents();
  }

  nextDay() {
    this.date_ref = moment(this.date_ref).add(1, 'day').format('YYYY-MM-DD');
    this.loadEvents();
  }

  goToday() {
    this.date_ref = moment().format('YYYY-MM-DD');
    this.loadEvents();
  }
}
