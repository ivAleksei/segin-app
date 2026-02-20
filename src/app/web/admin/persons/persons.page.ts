import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { AlertsService } from 'src/app/_shared/services/alerts.service';
import { LoadingService } from 'src/app/_shared/services/loading.service';
import { environment } from 'src/environments/environment';
import { I18nService } from 'src/app/_shared/services/i18n.service';
import { PersonsService } from 'src/app/_shared/providers/persons.service';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.page.html',
  styleUrls: ['./persons.page.scss'],
})
export class PersonsPage implements OnInit {
  @Output() public reloadTable: EventEmitter<any> = new EventEmitter();
  @ViewChild("modalPerson") modalPerson: any;
  @ViewChild('PersonForm') PersonForm: any;

  tableInfo: any = {
    id: "table-persons",
    columns: [
      { title: 'Name', data: "name" },
      { title: 'CPF', data: "cgc" },
      { title: 'Email', data: "email" },
      { title: 'Telefone', data: "phone" },
    ],
    ajax: {
      url: `${environment.API.admin}/server_side/persons`,
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
    private alertsService: AlertsService
  ) { }

  ngOnInit() { }

  ionViewWillEnter() { }

  handleTable(ev) {
    let map = {
      edit: () => {
        this.modalPerson.present();
        setTimeout(() => {
          this.PersonForm.form.patchValue(ev.data);
        }, 400);
      },
      new_user: async () => {
        await this.personsService.CreatePersonUser(ev.data._id)
          .then(data => {
            if (data?.status != 'success')
              return this.alertsService.notify({ type: "error", subtitle: this.i18n.lang.PERSON_NOT_UPDATED });

            this.clearPersonForm();
            return this.alertsService.notify({ type: "success", subtitle: this.i18n.lang.PERSON_UPDATED_SUCCESS });
          });
      },
      new: () => {
        this.modalPerson.present();
      },
      del: () => {
        this.personsService.delPerson(ev.data)
          .then(data => {
            if (data?.status != 'success')
              return this.alertsService.notify({ type: "error", subtitle: this.i18n.lang.PERSON_NOT_REMOVED });

            this.clearPersonForm();
            return this.alertsService.notify({ type: "success", subtitle: this.i18n.lang.PERSON_REMOVED_SUCCESS });
          });
      },
    }

    return map[ev.action](ev.data);
  }

  saveForm() {
    this.loadingService.show();
    let obj = Object.assign({}, this.PersonForm.value);

    this.personsService.savePerson(obj)
      .then(data => {
        this.loadingService.hide();
        if (data?.status != 'success')
          return this.alertsService.notify({ type: "error", subtitle: this.i18n.lang.PERSON_NOT_UPDATED });

        this.clearPersonForm();
        return this.alertsService.notify({ type: "success", subtitle: this.i18n.lang.PERSON_UPDATED_SUCCESS });
      });
  }

  clearPersonForm() {
    this.PersonForm?.form.reset();
    this.closeModal();
    this.reloadTable.next(true);
  }

  closeModal() {
    this.modalPerson.dismiss();
  }
}
