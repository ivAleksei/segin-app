import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { AlertsService } from 'src/app/_shared/services/alerts.service';
import { environment } from 'src/environments/environment';
import { I18nService } from 'src/app/_shared/services/i18n.service';
import { NotificationsService } from 'src/app/_shared/providers/notifications.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {
  @Output() public reloadTable: EventEmitter<any> = new EventEmitter();
  @ViewChild('modalNotification') modalNotification: any;
  @ViewChild('NotificationForm') NotificationForm: any;

  tableInfo: any = {
    id: 'table-notifications',
    columns: [
      { title: 'Título', data: 'title' },
      { title: 'Texto', data: 'text' },
      { title: 'Rota', data: 'route' },
    ],
    ajax: { url: `${environment.API.segin}/server_side/notifications` },
    actions: {
      buttons: [
        { action: 'edit', tooltip: 'Editar', class: 'btn-info', icon: 'mdi mdi-pencil' },
        { action: 'del', tooltip: 'Remover', class: 'btn-danger', icon: 'mdi mdi-close' },
      ]
    }
  };

  constructor(
    public i18n: I18nService,
    private notificationsService: NotificationsService,
    private alertsService: AlertsService,
  ) { }

  ngOnInit() { }

  handleTable(ev) {
    const map: any = {
      edit: () => {
        this.modalNotification.present();
        setTimeout(() => this.NotificationForm.form.patchValue(ev.data), 400);
      },
      new: () => this.modalNotification.present(),
      del: () => {
        this.notificationsService.delNotification(ev.data).then((data: any) => {
          if (data?.status !== 'success') return;
          this.alertsService.notify({ type: 'success', subtitle: 'Notificação removida.' });
          this.clearForm();
        });
      },
    };
    return map[ev.action](ev.data);
  }

  saveForm() {
    let obj = Object.assign({}, this.NotificationForm.value);
    this.notificationsService.saveNotification(obj).then((data: any) => {
      if (data?.status !== 'success')
        return this.alertsService.notify({ type: 'error', subtitle: 'Erro ao salvar.' });
      this.alertsService.notify({ type: 'success', subtitle: 'Notificação salva.' });
      this.clearForm();
    });
  }

  clearForm() {
    this.NotificationForm?.form.reset();
    this.closeModal();
    this.reloadTable.next(true);
  }

  closeModal() { this.modalNotification.dismiss(); }
}
