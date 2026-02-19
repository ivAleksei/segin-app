import { Component, Input, OnInit, ViewChild } from '@angular/core';
import moment from 'moment';
import { PersonsService } from 'src/app/_shared/providers/persons.service';
import { AlertsService } from 'src/app/_shared/services/alerts.service';
import { LoadingService } from 'src/app/_shared/services/loading.service';
import { UtilsService } from 'src/app/_shared/services/utils.service';

@Component({
  selector: 'app-crh-documents-form',
  templateUrl: './crh-documents-form.page.html',
  styleUrls: ['./crh-documents-form.page.scss'],
})
export class CrhDocumentsFormPage implements OnInit {
  @ViewChild("DocumentsForm") DocumentsForm: any;
  @Input() edit: any;
  @Input() _id: any;

  today: any = moment().format();
  info: any;
  str_nomecurto: any;

  constructor(
    private utils: UtilsService,
    private alertsService: AlertsService,
    private loadingService: LoadingService,
    private personsService: PersonsService
  ) { }

  ngOnInit() {
    this.setupPage();
  }

  setupPage() {
    this.getPersonData();
  }


  async getPersonData() {
    let data = await this.personsService.getPersonInfo({ _id: this._id }, ``);

    this.info = data || null;
    this.str_nomecurto = data?.short_name || null;

    // FuncionalForm
    this.DocumentsForm.form.patchValue(data);
  }




  saveData() {
    let form_docs = Object.assign({}, this.DocumentsForm.value);

    let payload: any = Object.assign({}, form_docs, { _id: this._id });
    this.loadingService.show();
    return this.personsService.savePerson(payload)
      .then(done => {
        this.loadingService.hide();
        this.notifyUpd(done?.status == 'success')
      });
  }

  notifyUpd(success) {
    if (!success) {
      return this.alertsService.notify({ type: "error", subtitle: "Ficha não foi atualizada" });
    }


    this.getPersonData();
    return this.alertsService.notify({ type: "success", subtitle: "Ficha atualizada com sucesso" });
  }

}
