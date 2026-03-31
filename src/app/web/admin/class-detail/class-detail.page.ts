import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { AlertsService } from 'src/app/_shared/services/alerts.service';
import { LoadingService } from 'src/app/_shared/services/loading.service';
import { UtilsService } from 'src/app/_shared/services/utils.service';
import { environment } from 'src/environments/environment';
import { ClassDetailService } from './class-detail.service';
import { I18nService } from 'src/app/_shared/services/i18n.service';

@Component({
  selector: 'app-class-detail',
  templateUrl: './class-detail.page.html',
  styleUrls: ['./class-detail.page.scss'],
})
export class ClassDetailPage implements OnInit {
  @Output() public reloadTable: EventEmitter<any> = new EventEmitter();
  @ViewChild('modalClassDetail') modalClassDetail: any;
  @ViewChild('ClassDetailForm') ClassDetailForm: any;
  listClassDetails: any[] = [];

  tableInfo: any = {
    id: 'table-class-details',
    columns: [
      { title: 'Name', data: 'name' },
    ],
    ajax: {
      url: `${environment.API.segin}/server_side/class-details`,
    },
    actions: {
      buttons: [
        { action: 'edit', tooltip: 'Editar', class: 'btn-info', icon: 'mdi mdi-pencil' },
        { action: 'del', tooltip: 'Remover', class: 'btn-danger', icon: 'mdi mdi-close' }
      ]
    }
  }

  constructor(
    private utils: UtilsService,
    public i18n: I18nService,
    private loadingService: LoadingService,
    private classDetailService: ClassDetailService,
    private alertsService: AlertsService
  ) { }

  ngOnInit() { }

  ionViewWillEnter() {
    this.getData();
  }

  getData() {
    this.loadClassDetails();
  }

  async loadClassDetails() {
    this.loadingService.show();
    let data = await this.classDetailService.getClassDetails();
    this.loadingService.hide();
    this.listClassDetails = data || [];
  }

  handleTable(ev) {
    let map = {
      edit: () => {
        this.modalClassDetail.present();
        setTimeout(() => {
          this.ClassDetailForm.form.patchValue(ev.data);
        }, 400);
      },
      new: () => {
        this.modalClassDetail.present();
      },
      del: () => {
        this.classDetailService.delClassDetail(ev.data)
          .then(data => {
            if (data?.status != 'success')
              return this.alertsService.notify({ type: 'error', subtitle: 'ClassDetail não removido' });

            this.clearClassDetailForm();
            return this.alertsService.notify({ type: 'success', subtitle: 'ClassDetail removido com sucesso' });
          });
      },
    }

    return map[ev.action](ev.data);
  }

  saveForm() {
    this.loadingService.show();
    let obj = Object.assign({}, this.ClassDetailForm.value);
    this.classDetailService.saveClassDetail(obj)
      .then(data => {
        this.loadingService.hide();
        if (data?.status != 'success')
          return this.alertsService.notify({ type: 'error', subtitle: 'ClassDetail não atualizado' });

        this.clearClassDetailForm();
        return this.alertsService.notify({ type: 'success', subtitle: 'ClassDetail atualizado com sucesso' });
      });
  }

  clearClassDetailForm() {
    this.ClassDetailForm?.form.reset();
    this.closeModal();
    this.reloadTable.next(true);
  }

  closeModal() {
    this.modalClassDetail.dismiss();
  }
}
