import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { AlertsService } from 'src/app/_shared/services/alerts.service';
import { LoadingService } from 'src/app/_shared/services/loading.service';
import { UtilsService } from 'src/app/_shared/services/utils.service';
import { environment } from 'src/environments/environment';
import { NoticesService } from 'src/app/_shared/providers/notices.service';
import { I18nService } from 'src/app/_shared/services/i18n.service';

@Component({
  selector: 'app-notices',
  templateUrl: './notices.page.html',
  styleUrls: ['./notices.page.scss'],
})
export class NoticesPage implements OnInit {
  @Output() public reloadTable: EventEmitter<any> = new EventEmitter();
  @ViewChild("modalNotice") modalNotice: any;
  @ViewChild('NoticeForm') NoticeForm: any;
  list_notices: any[] = [];

  tableInfo: any = {
    id: "table-notices",
    columns: [
      { title: 'Name', data: "name" },
    ],
    ajax: {
      url: `${environment.API.segin}/server_side/notices`,
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
    public i18n: I18nService,
    private loadingService: LoadingService,
    private noticesService: NoticesService,
    private alertsService: AlertsService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getData();
  }

  getData() {
    this.loadNotice();
  }

  /**
   * loadNotice: Método que busca as viaturas para o autocomplete.
   */
  async loadNotice() {
    this.loadingService.show();
    let data = await this.noticesService.getNotices();
    this.loadingService.hide();
    this.list_notices = (data || []).map(it => {
      it.label = [it.prefixo, it.placa].join(' - ');
      return it;
    });
  }

  handleTable(ev) {
    let map = {
      edit: () => {
        this.modalNotice.present();
        setTimeout(() => {
          this.NoticeForm.form.patchValue(ev.data);
        }, 400);
      },
      new: () => {
        this.modalNotice.present();
      },
      del: () => {
        this.noticesService.delNotice(ev.data)
          .then(data => {
            if (data?.status != 'success')
              return this.alertsService.notify({ type: "error", subtitle: 'Notice não removido' });

            this.clearNoticeForm();
            return this.alertsService.notify({ type: "success", subtitle: 'Notice removido com sucesso' });
          });
      },
    }

    return map[ev.action](ev.data);
  }

  saveForm() {
    this.loadingService.show();
    let obj = Object.assign({}, this.NoticeForm.value);
    this.noticesService.saveNotice(obj)
      .then(data => {
        this.loadingService.hide();
        if (data?.status != 'success')
          return this.alertsService.notify({ type: "error", subtitle: 'Notice não atualizado' });

        this.clearNoticeForm();
        return this.alertsService.notify({ type: "success", subtitle: 'Notice atualizado com sucesso' });
      });
  }

  clearNoticeForm() {
    this.NoticeForm?.form.reset();
    this.closeModal();
    this.reloadTable.next(true);
  }

  closeModal() {
    this.modalNotice.dismiss();
  }

}
