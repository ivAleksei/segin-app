import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { AlertsService } from 'src/app/_shared/services/alerts.service';
import { LoadingService } from 'src/app/_shared/services/loading.service';
import { UtilsService } from 'src/app/_shared/services/utils.service';
import { environment } from 'src/environments/environment';
import { NoticesService } from 'src/app/_shared/providers/notices.service';
import { I18nService } from 'src/app/_shared/services/i18n.service';

@Component({
  selector: 'app-notice-forms',
  templateUrl: './notice-form.page.html',
  styleUrls: ['./notice-form.page.scss'],
})
export class NoticeFormPage implements OnInit {
  @Output() public reloadTable: EventEmitter<any> = new EventEmitter();
  @ViewChild("modalNoticeForm") modalNoticeForm: any;
  @ViewChild('NoticeFormForm') NoticeFormForm: any;

  tableInfo: any = {
    id: "table-notice-forms",
    columns: [
      { title: 'Name', data: "name" },
    ],
    ajax: {
      url: `${environment.API.segin}/server_side/notice-forms`,
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
  }


  handleTable(ev) {
    let map = {
      edit: () => {
        this.modalNoticeForm.present();
        setTimeout(() => {
          this.NoticeFormForm.form.patchValue(ev.data);
        }, 400);
      },
      new: () => {
        this.modalNoticeForm.present();
      },
      del: () => {
        this.noticesService.delNotice(ev.data)
          .then(data => {
            if (data?.status != 'success')
              return this.alertsService.notify({ type: "error", subtitle: 'NoticeForm não removido' });

            this.clearNoticeFormForm();
            return this.alertsService.notify({ type: "success", subtitle: 'NoticeForm removido com sucesso' });
          });
      },
    }

    return map[ev.action](ev.data);
  }

  saveForm() {
    this.loadingService.show();
    let obj = Object.assign({}, this.NoticeFormForm.value);
    this.noticesService.saveNotice(obj)
      .then(data => {
        this.loadingService.hide();
        if (data?.status != 'success')
          return this.alertsService.notify({ type: "error", subtitle: 'NoticeForm não atualizado' });

        this.clearNoticeFormForm();
        return this.alertsService.notify({ type: "success", subtitle: 'NoticeForm atualizado com sucesso' });
      });
  }

  clearNoticeFormForm() {
    this.NoticeFormForm?.form.reset();
    this.closeModal();
    this.reloadTable.next(true);
  }

  closeModal() {
    this.modalNoticeForm.dismiss();
  }

}
