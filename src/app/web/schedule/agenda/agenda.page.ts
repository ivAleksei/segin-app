import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { AlertsService } from 'src/app/_shared/services/alerts.service';
import { environment } from 'src/environments/environment';
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
  @Output() public reloadTable: EventEmitter<any> = new EventEmitter();
  @ViewChild('modalAgenda') modalAgenda: any;
  @ViewChild('AgendaForm') AgendaForm: any;

  date_ref: string = moment().format('YYYY-MM-DD');
  list_classes: any[] = [];

  event_types = [
    { value: 'aula', label: 'Aula' },
    { value: 'evento', label: 'Evento' },
    { value: 'feriado', label: 'Feriado' },
    { value: 'reuniao', label: 'Reunião' },
    { value: 'outro', label: 'Outro' },
  ];

  tableInfo: any = {
    id: 'table-schedule-agenda',
    columns: [
      { title: 'Título', data: 'title' },
      { title: 'Data', data: 'date' },
      { title: 'Início', data: 'time_start' },
      { title: 'Fim', data: 'time_end' },
      { title: 'Tipo', data: 'type' },
      { title: 'Publicado', data: 'published', render: (v) => v ? '✓' : '—' },
    ],
    ajax: { url: `${environment.API.segin}/server_side/agenda` },
    actions: {
      buttons: [
        { action: 'edit', tooltip: 'Editar', class: 'btn-info', icon: 'mdi mdi-pencil' },
        { action: 'del', tooltip: 'Remover', class: 'btn-danger', icon: 'mdi mdi-close' },
      ]
    }
  };

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
  }

  handleTable(ev) {
    const map: any = {
      edit: () => {
        this.modalAgenda.present();
        setTimeout(() => this.AgendaForm.form.patchValue(ev.data), 400);
      },
      new: () => this.modalAgenda.present(),
      del: () => {
        this.agendaService.delAgenda(ev.data).then((data: any) => {
          if (data?.status !== 'success')
            return this.alertsService.notify({ type: 'error', subtitle: 'Evento não removido.' });
          this.clearForm();
          this.alertsService.notify({ type: 'success', subtitle: 'Evento removido com sucesso.' });
        });
      },
    };
    return map[ev.action](ev.data);
  }

  saveForm() {
    let obj = Object.assign({}, this.AgendaForm.value);
    if (obj.published === '') obj.published = false;
    if (obj.all_day === '') obj.all_day = false;

    this.agendaService.saveAgenda(obj).then((data: any) => {
      if (data?.status !== 'success')
        return this.alertsService.notify({ type: 'error', subtitle: 'Evento não salvo.' });
      this.clearForm();
      this.alertsService.notify({ type: 'success', subtitle: 'Evento salvo com sucesso.' });
    });
  }

  clearForm() {
    this.AgendaForm?.form.reset();
    this.closeModal();
    this.reloadTable.next(true);
  }

  closeModal() { this.modalAgenda.dismiss(); }
}
