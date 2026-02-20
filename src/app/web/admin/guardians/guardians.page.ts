import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { AlertsService } from 'src/app/_shared/services/alerts.service';
import { LoadingService } from 'src/app/_shared/services/loading.service';
import { environment } from 'src/environments/environment';
import { I18nService } from 'src/app/_shared/services/i18n.service';
import { GuardiansService } from 'src/app/_shared/providers/guardians.service';
import { PersonsService } from 'src/app/_shared/providers/persons.service';

@Component({
  selector: 'app-guardians',
  templateUrl: './guardians.page.html',
  styleUrls: ['./guardians.page.scss'],
})
export class GuardiansPage implements OnInit {
  @Output() public reloadTable: EventEmitter<any> = new EventEmitter();
  @ViewChild("modalGuardian") modalGuardian: any;
  @ViewChild('GuardianForm') GuardianForm: any;

  tableInfo: any = {
    id: "table-guardians",
    columns: [
      { title: 'Name', data: "name" },
      { title: 'CPF', data: "cgc" },
      { title: 'Email', data: "email" },
      { title: 'Telefone', data: "phone" },
    ],
    ajax: {
      url: `${environment.API.segin}/server_side/guardians`,
    },
    actions: {
      buttons: [
        { action: "new_user", tooltip: "Criar Usuário", class: "btn-warning", icon: "mdi mdi-account-plus" },
        { action: "edit", tooltip: "Editar", class: "btn-info", icon: "mdi mdi-pencil" },
        { action: "del", tooltip: "Remove", class: "btn-danger", icon: "mdi mdi-close" }
      ]
    }
  }

  constructor(
    public i18n: I18nService,
    private loadingService: LoadingService,
    private personsService: PersonsService,
    private guardiansService: GuardiansService,
    private alertsService: AlertsService
  ) { }

  ngOnInit() { }

  ionViewWillEnter() { }

  handleTable(ev) {
    let map = {
      new_user: async () => {
        await this.personsService.CreatePersonUser(ev.data._person)
          .then(data => {
            if (data?.status != 'success')
              return this.alertsService.notify({ type: "error", subtitle: this.i18n.lang.PERSON_NOT_UPDATED });

            this.clearGuardianForm();
            return this.alertsService.notify({ type: "success", subtitle: this.i18n.lang.PERSON_UPDATED_SUCCESS });
          });
      },
      edit: () => {
        this.modalGuardian.present();
        setTimeout(() => {
          this.GuardianForm.form.patchValue(ev.data);
        }, 400);
      },
      new: () => {
        this.modalGuardian.present();
      },
      del: () => {
        this.guardiansService.delGuardian(ev.data)
          .then(data => {
            if (data?.status != 'success')
              return this.alertsService.notify({ type: "error", subtitle: this.i18n.lang.GUARDIAN_NOT_REMOVED });

            this.clearGuardianForm();
            return this.alertsService.notify({ type: "success", subtitle: this.i18n.lang.GUARDIAN_REMOVED_SUCCESS });
          });
      },
    }

    return map[ev.action](ev.data);
  }

  saveForm() {
    this.loadingService.show();
    let obj = Object.assign({}, this.GuardianForm.value);

    this.guardiansService.saveGuardian(obj)
      .then(data => {
        this.loadingService.hide();
        if (data?.status != 'success')
          return this.alertsService.notify({ type: "error", subtitle: this.i18n.lang.GUARDIAN_NOT_UPDATED });

        this.clearGuardianForm();
        return this.alertsService.notify({ type: "success", subtitle: this.i18n.lang.GUARDIAN_UPDATED_SUCCESS });
      });
  }

  clearGuardianForm() {
    this.GuardianForm?.form.reset();
    this.closeModal();
    this.reloadTable.next(true);
  }

  closeModal() {
    this.modalGuardian.dismiss();
  }
}
