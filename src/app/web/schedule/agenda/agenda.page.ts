import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertsService } from 'src/app/_shared/services/alerts.service';
import { I18nService } from 'src/app/_shared/services/i18n.service';
import { AgendaService } from 'src/app/_shared/providers/agenda.service';
import { ClassesService } from 'src/app/_shared/providers/classes.service';
import moment from 'moment';

@Component({
  selector: 'app-schedule-agenda',
  templateUrl: './agenda.page.html',
  styleUrls: ['./agenda.page.scss'],
})
export class ScheduleAgendaPage implements OnInit {
  @ViewChild('modalAgenda') modalAgenda: any;
  @ViewChild('AgendaForm') AgendaForm: any;

  date_ref: string = moment().format('YYYY-MM-DD');
  date_label: string = '';
  list_events: any[] = [];
  list_classes: any[] = [];
  filter_class: string = '';

  event_types = [
    { value: 'aula', label: 'Aula' },
    { value: 'evento', label: 'Evento' },
    { value: 'feriado', label: 'Feriado' },
    { value: 'reuniao', label: 'Reunião' },
    { value: 'outro', label: 'Outro' },
  ];

  constructor(
    public i18n: I18nService,
    private agendaService: AgendaService,
    private classesService: ClassesService,
    private alertsService: AlertsService,
  ) { }

  ngOnInit() { }

  ionViewWillEnter() {
    this.classesService.getClasses({}, 'name').then((data: any) => {
      this.list_classes = data || [];
    });
    this.loadEvents();

    // this.socketService.on('event', (payload: any) => {
    //   if (payload?.table_obj === 'agenda') this.loadEvents();
    // });
  }

  ionViewWillLeave() {
    // this.socketService.off('event');
  }

  updateDateLabel() {
    const m = moment(this.date_ref);
    const today = moment().format('YYYY-MM-DD');
    if (this.date_ref === today) this.date_label = 'Hoje';
    else if (this.date_ref === moment().add(1, 'day').format('YYYY-MM-DD')) this.date_label = 'Amanhã';
    else if (this.date_ref === moment().subtract(1, 'day').format('YYYY-MM-DD')) this.date_label = 'Ontem';
    else this.date_label = m.format('dddd, D [de] MMMM');
  }

  loadEvents() {
    this.updateDateLabel();
    const args: any = { date: this.date_ref };
    if (this.filter_class) args._class = this.filter_class;

    this.agendaService.getAgendas(args, 'title description date time_start time_end type color all_day published _class').then((data: any) => {
      this.list_events = (data || []).sort((a, b) => {
        if (!a.time_start) return 1;
        if (!b.time_start) return -1;
        return a.time_start.localeCompare(b.time_start);
      });
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

  openNew() {
    this.modalAgenda.present();
    setTimeout(() => this.AgendaForm?.form.patchValue({ date: this.date_ref }), 400);
  }

  openEdit(ev: any) {
    this.modalAgenda.present();
    setTimeout(() => this.AgendaForm?.form.patchValue(ev), 400);
  }

  deleteEvent(ev: any) {
    this.agendaService.delAgenda(ev).then((data: any) => {
      if (data?.status !== 'success') return;
      this.alertsService.notify({ type: 'success', subtitle: 'Evento removido.' });
      this.loadEvents();
    });
  }

  saveForm() {
    let obj = Object.assign({}, this.AgendaForm.value);
    if (obj.published === '') obj.published = false;
    if (obj.all_day === '') obj.all_day = false;

    this.agendaService.saveAgenda(obj).then((data: any) => {
      if (data?.status !== 'success')
        return this.alertsService.notify({ type: 'error', subtitle: 'Evento não salvo.' });
      this.alertsService.notify({ type: 'success', subtitle: 'Evento salvo com sucesso.' });
      this.clearForm();
    });
  }

  clearForm() {
    this.AgendaForm?.form.reset();
    this.closeModal();
    this.loadEvents();
  }

  closeModal() { this.modalAgenda.dismiss(); }

  getEventClass(type: string) {
    const map: any = {
      aula: 'event-aula',
      evento: 'event-evento',
      feriado: 'event-feriado',
      reuniao: 'event-reuniao',
      outro: 'event-outro',
    };
    return map[type] || 'event-outro';
  }

  getClassName(_class: string) {
    const found = this.list_classes.find(c => c._id === _class);
    return found?.name || 'Todas as turmas';
  }
}
