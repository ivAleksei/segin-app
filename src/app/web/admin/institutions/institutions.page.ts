import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { AlertsService } from 'src/app/_shared/services/alerts.service';
import { LoadingService } from 'src/app/_shared/services/loading.service';
import { UtilsService } from 'src/app/_shared/services/utils.service';
import { environment } from 'src/environments/environment';
import { InstitutionsService } from 'src/app/_shared/providers/institutions.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-institutions',
  templateUrl: './institutions.page.html',
  styleUrls: ['./institutions.page.scss'],
})
export class InstitutionsPage implements OnInit {
  @Output() public reloadTable: EventEmitter<any> = new EventEmitter();
  @ViewChild("modalInstitution") modalInstitution: any;
  @ViewChild('InstitutionForm') InstitutionForm: any;
  list_institutions: any[] = [];

  tableInfo: any = {
    id: "table-institutions",
    columns: [
      { title: 'Name', data: "name" },
    ],
    ajax: {
      url: `${environment.API.segin}/server_side/institutions`,
    },
    actions: {
      buttons: [
        { action: "detail", tooltip: "Detalhe", class: "btn-light", icon: "mdi mdi-eye" },
        { action: "edit", tooltip: "Editar", class: "btn-info", icon: "mdi mdi-pencil" },
        { action: "del", tooltip: "Remove", class: "btn-danger", icon: "mdi mdi-close" }
      ]
    }
  }

  constructor(
    private nav: NavController,
    private utils: UtilsService,
    private loadingService: LoadingService,
    private institutionsService: InstitutionsService,
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
      detail: () => this.nav.navigateForward(['/internal/admin/escola-detalhe', ev?.data?._id]),
      edit: () => {
        this.modalInstitution.present();
        setTimeout(() => {
          this.InstitutionForm.form.patchValue(ev.data);
        }, 400);
      },
      new: () => {
        this.modalInstitution.present();
      },
      del: () => {
        this.institutionsService.delInstitution(ev.data)
          .then(data => {
            if (data?.status != 'success')
              return this.alertsService.notify({ type: "error", subtitle: 'Institution não removido' });

            this.clearInstitutionForm();
            return this.alertsService.notify({ type: "success", subtitle: 'Institution removido com sucesso' });
          });
      },
    }

    return map[ev.action](ev.data);
  }

  saveForm() {
    this.loadingService.show();
    let obj = Object.assign({}, this.InstitutionForm.value);
    this.institutionsService.saveInstitution(obj)
      .then(data => {
        this.loadingService.hide();
        if (data?.status != 'success')
          return this.alertsService.notify({ type: "error", subtitle: 'Institution não atualizado' });

        this.clearInstitutionForm();
        return this.alertsService.notify({ type: "success", subtitle: 'Institution atualizado com sucesso' });
      });
  }

  clearInstitutionForm() {
    this.InstitutionForm?.form.reset();
    this.closeModal();
    this.reloadTable.next(true);
  }

  closeModal() {
    this.modalInstitution.dismiss();
  }

}
