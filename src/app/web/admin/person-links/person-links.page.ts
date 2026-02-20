import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { AlertsService } from 'src/app/_shared/services/alerts.service';
import { LoadingService } from 'src/app/_shared/services/loading.service';
import { environment } from 'src/environments/environment';
import { I18nService } from 'src/app/_shared/services/i18n.service';

import { PersonsService } from 'src/app/_shared/providers/persons.service';
import { PersonLinksService } from 'src/app/_shared/providers/person-links.service';
import { GuardiansService } from 'src/app/_shared/providers/guardians.service';
import { StudentsService } from 'src/app/_shared/providers/students.service';

@Component({
  selector: 'app-person-links',
  templateUrl: './person-links.page.html',
  styleUrls: ['./person-links.page.scss'],
})
export class PersonLinksPage implements OnInit {
  @Output() public reloadTable: EventEmitter<any> = new EventEmitter();

  @ViewChild("modalLink") modalLink: any;
  @ViewChild("LinkForm") LinkForm: any;

  // listas para selects
  list_guardians: any[] = [];
  list_students: any[] = [];

  tableInfo: any = {
    id: "table-person-links",
    columns: [
      { title: 'Últ. Atualização', data: "updated_at", datatype: "pipe", pipe: "DatePipe", options: "DD/MM/YYYY HH:mm" },
      { title: 'Responsável', data: "guardian.name" },
      { title: 'Aluno', data: "student.name" },
    ],
    ajax: {
      url: `${environment.API.segin}/server_side/person-links`,
    },
    actions: {
      buttons: [
        { action: "edit", tooltip: "Editar", class: "btn-info", icon: "mdi mdi-pencil" },
        { action: "del", tooltip: "Remove", class: "btn-danger", icon: "mdi mdi-close" }
      ]
    }
  }

  constructor(
    public i18n: I18nService,
    private loadingService: LoadingService,
    private alertsService: AlertsService,
    private guardiansService: GuardiansService,
    private studentsService: StudentsService,
    private personLinksService: PersonLinksService,
  ) { }

  ngOnInit() { }

  ionViewWillEnter() {
    this.getData();
  }

  async getData() {
    await this.loadGuardians();
    await this.loadStudents();
  }

  async loadGuardians() {
    this.loadingService.show();
    let data = await this.guardiansService.getGuardians({}, `
      _id cgc name
    `);
    this.list_guardians = (data || []);
    this.loadingService.hide();
  }
  async loadStudents() {
    this.loadingService.show();
    let data = await this.studentsService.getStudents({}, `
      _id cgc name
    `);
    this.list_students = (data || []);
    this.loadingService.hide();
  }


  handleTable(ev) {
    let map = {
      edit: async () => {
        await this.getData();

        this.modalLink.present();
        setTimeout(() => {
          this.LinkForm.form.patchValue(ev.data);
        }, 100);
      },

      new: async () => {
        await this.getData();
        this.modalLink.present();
      },

      del: async () => {
        this.personLinksService.delPersonLink(ev.data)
          .then(data => {
            if (data?.status != 'success')
              return this.alertsService.notify({ type: "error", subtitle: this.i18n.lang.LINK_NOT_REMOVED });

            this.clear();
            return this.alertsService.notify({ type: "success", subtitle: this.i18n.lang.LINK_REMOVED_SUCCESS });
          });
      },
    }

    return map[ev.action](ev.data);
  }

  saveForm() {
    this.loadingService.show();
    let obj = Object.assign({}, this.LinkForm.value);

    if (!obj?._guardian || !obj?._student) {
      this.loadingService.hide();
      return this.alertsService.notify({ type: "error", subtitle: this.i18n.lang.FILL_REQUIRED_FIELDS });
    }

    if (obj._guardian == obj._student){
      this.loadingService.hide();
      return this.alertsService.notify({ type: "error", subtitle: this.i18n.lang.ERR_LINK_SAME_PERSON });
    }

    this.personLinksService.savePersonLink(obj)
      .then(data => {
        this.loadingService.hide();

        if (data?.status != 'success')
          return this.alertsService.notify({ type: "error", subtitle: this.i18n.lang.LINK_NOT_UPDATED });

        this.clear();
        return this.alertsService.notify({ type: "success", subtitle: this.i18n.lang.LINK_UPDATED_SUCCESS });
      });
  }

  clear() {
    this.LinkForm?.form.reset();
    this.modalLink.dismiss();
    this.reloadTable.next(true);
  }
}
