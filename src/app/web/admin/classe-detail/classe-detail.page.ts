import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { AlertsService } from 'src/app/_shared/services/alerts.service';
import { LoadingService } from 'src/app/_shared/services/loading.service';
import { UtilsService } from 'src/app/_shared/services/utils.service';
import { environment } from 'src/environments/environment';
import { ClasseDetailsService } from 'src/app/_shared/providers/classe-details.service';
import { I18nService } from 'src/app/_shared/services/i18n.service';

@Component({
  selector: 'app-classe-details',
  templateUrl: './classe-detail.page.html',
  styleUrls: ['./classe-detail.page.scss'],
})
export class ClasseDetailPage implements OnInit {
  @Output() public reloadTable: EventEmitter<any> = new EventEmitter();
  @ViewChild("modalClasseDetail") modalClasseDetail: any;
  @ViewChild('ClasseDetailForm') ClasseDetailForm: any;
  list_classe-details: any[] = [];

  tableInfo: any = {
    id: "table-classe-details",
    columns: [
      { title: 'Name', data: "name" },
    ],
    ajax: {
      url: `${environment.API.segin}/server_side/classe-details`,
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
    private classe-detailsService: ClasseDetailsService,
    private alertsService: AlertsService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getData();
  }

  getData() {
    this.loadClasseDetail();
  }

  /**
   * loadClasseDetail: Método que busca as viaturas para o autocomplete.
   */
  async loadClasseDetail() {
    this.loadingService.show();
    let data = await this.classe-detailsService.getClasseDetails();
    this.loadingService.hide();
    this.list_classe-details = (data || []).map(it => {
      it.label = [it.prefixo, it.placa].join(' - ');
      return it;
    });
  }

  handleTable(ev) {
    let map = {
      edit: () => {
        this.modalClasseDetail.present();
        setTimeout(() => {
          this.ClasseDetailForm.form.patchValue(ev.data);
        }, 400);
      },
      new: () => {
        this.modalClasseDetail.present();
      },
      del: () => {
        this.classe-detailsService.delClasseDetail(ev.data)
          .then(data => {
            if (data?.status != 'success')
              return this.alertsService.notify({ type: "error", subtitle: 'ClasseDetail não removido' });

            this.clearClasseDetailForm();
            return this.alertsService.notify({ type: "success", subtitle: 'ClasseDetail removido com sucesso' });
          });
      },
    }

    return map[ev.action](ev.data);
  }

  saveForm() {
    this.loadingService.show();
    let obj = Object.assign({}, this.ClasseDetailForm.value);
    this.classe-detailsService.saveClasseDetail(obj)
      .then(data => {
        this.loadingService.hide();
        if (data?.status != 'success')
          return this.alertsService.notify({ type: "error", subtitle: 'ClasseDetail não atualizado' });

        this.clearClasseDetailForm();
        return this.alertsService.notify({ type: "success", subtitle: 'ClasseDetail atualizado com sucesso' });
      });
  }

  clearClasseDetailForm() {
    this.ClasseDetailForm?.form.reset();
    this.closeModal();
    this.reloadTable.next(true);
  }

  closeModal() {
    this.modalClasseDetail.dismiss();
  }

}
