import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { AlertsService } from 'src/app/_shared/services/alerts.service';
import { LoadingService } from 'src/app/_shared/services/loading.service';
import { UtilsService } from 'src/app/_shared/services/utils.service';
import { environment } from 'src/environments/environment';
import { LogsService } from 'src/app/_shared/providers/logs.service';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.page.html',
  styleUrls: ['./logs.page.scss'],
})
export class LogsPage implements OnInit {
  @Output() public reloadTable: EventEmitter<any> = new EventEmitter();
  @ViewChild("modalLogs") modalLogs: any;
  @ViewChild('LogsForm') LogsForm: any;
  list_logs: any[] = [];

  tableInfo: any = {
    id: "table-logs",
    columns: [
      { title: 'Name', data: "name" },
    ],
    ajax: {
      url: `${environment.API.segin}/server_side/logs`,
    },
    actions: {
      buttons: [
        { action: "edit", tooltip: "Editar", class: "btn-info", icon: "mdi mdi-pencil" },
        { action: "del", tooltip: "Remove", class: "btn-danger", icon: "mdi mdi-close" }
      ]
    }
  }

  constructor(
    private utils: UtilsService,
    private loadingService: LoadingService,
    private logsService: LogsService,
    private alertsService: AlertsService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getData();
  }

  getData() {
    this.loadLogs();
  }

  /**
   * loadLogs: Método que busca as viaturas para o autocomplete.
   */
  async loadLogs() {
    this.loadingService.show();
    let data = await this.logsService.getLogs();
    this.loadingService.hide();
    this.list_logs = (data || []).map(it => {
      it.label = [it.prefixo, it.placa].join(' - ');
      return it;
    });
  }

  handleTable(ev) {
    let map = {
      edit: () => {
        this.modalLogs.present();
        setTimeout(() => {
          this.LogsForm.form.patchValue(ev.data);
        }, 400);
      },
      new: () => {
        this.modalLogs.present();
      },
      del: () => {
        this.logsService.delLogs(ev.data)
          .then(data => {
            if (data?.status != 'success')
              return this.alertsService.notify({ type: "error", subtitle: 'Logs não removido' });

            this.clearLogsForm();
            return this.alertsService.notify({ type: "success", subtitle: 'Logs removido com sucesso' });
          });
      },
    }

    return map[ev.action](ev.data);
  }

  saveForm() {
    this.loadingService.show();
    let obj = Object.assign({}, this.LogsForm.value);
    this.logsService.saveLogs(obj)
      .then(data => {
        this.loadingService.hide();
        if (data?.status != 'success')
          return this.alertsService.notify({ type: "error", subtitle: 'Logs não atualizado' });

        this.clearLogsForm();
        return this.alertsService.notify({ type: "success", subtitle: 'Logs atualizado com sucesso' });
      });
  }

  clearLogsForm() {
    this.LogsForm?.form.reset();
    this.closeModal();
    this.reloadTable.next(true);
  }

  closeModal() {
    this.modalLogs.dismiss();
  }

}
