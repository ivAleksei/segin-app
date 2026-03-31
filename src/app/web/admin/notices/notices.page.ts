import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { AlertsService } from 'src/app/_shared/services/alerts.service';
import { LoadingService } from 'src/app/_shared/services/loading.service';
import { environment } from 'src/environments/environment';
import { I18nService } from 'src/app/_shared/services/i18n.service';
import { NoticesService } from 'src/app/_shared/providers/notices.service';

@Component({
  selector: 'app-notices',
  templateUrl: './notices.page.html',
  styleUrls: ['./notices.page.scss'],
})
export class NoticesPage implements OnInit {
  @Output() public reloadTable: EventEmitter<any> = new EventEmitter();
  @ViewChild("modalNotice") modalNotice: any;
  @ViewChild('NoticeForm') NoticeForm: any;

  tableInfo: any = {
    id: "table-notices",
    columns: [
      { title: 'Título', data: "title" },
      { title: 'Publicado', data: "published", render: (v) => v ? '✓' : '—' },
      { title: 'Fixado', data: "pinned", render: (v) => v ? '📌' : '—' },
      { title: 'Início', data: "start_at" },
      { title: 'Fim', data: "end_at" },
    ],
    ajax: {
      url: `${environment.API.segin}/server_side/notices`,
    },
    actions: {
      buttons: [
        { action: "edit", tooltip: "Editar", class: "btn-info", icon: "mdi mdi-pencil" },
        { action: "del", tooltip: "Remover", class: "btn-danger", icon: "mdi mdi-close" }
      ]
    }
  }

  constructor(
    public i18n: I18nService,
    private loadingService: LoadingService,
    private noticesService: NoticesService,
    private alertsService: AlertsService
  ) { }

  ngOnInit() { }

  ionViewWillEnter() { }

  handleTable(ev) {
    let map: any = {
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
          .then((data: any) => {
            if (data?.status != 'success')
              return this.alertsService.notify({ type: "error", subtitle: "Aviso não removido." });

            this.clearForm();
            return this.alertsService.notify({ type: "success", subtitle: "Aviso removido com sucesso." });
          });
      },
    }

    return map[ev.action](ev.data);
  }

  saveForm() {
    let obj = Object.assign({}, this.NoticeForm.value);
    if (obj.published === '') obj.published = false;
    if (obj.pinned === '') obj.pinned = false;

    this.noticesService.saveNotice(obj)
      .then((data: any) => {
        if (data?.status != 'success')
          return this.alertsService.notify({ type: "error", subtitle: "Aviso não salvo." });

        this.clearForm();
        return this.alertsService.notify({ type: "success", subtitle: "Aviso salvo com sucesso." });
      });
  }

  clearForm() {
    this.NoticeForm?.form.reset();
    this.closeModal();
    this.reloadTable.next(true);
  }

  closeModal() {
    this.modalNotice.dismiss();
  }
}
