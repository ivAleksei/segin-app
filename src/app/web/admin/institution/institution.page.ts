import { Component, OnInit } from '@angular/core';
import { AlertsService } from 'src/app/_shared/services/alerts.service';
import { LocalStorageService } from 'src/app/_shared/services/local-storage.service';
import { InstitutionsService } from 'src/app/_shared/providers/institutions.service';

@Component({
  selector: 'app-institution',
  templateUrl: './institution.page.html',
  styleUrls: ['./institution.page.scss'],
})
export class InstitutionPage implements OnInit {

  institution: any = {};

  constructor(
    private institutionsService: InstitutionsService,
    private alertsService: AlertsService,
    private storage: LocalStorageService,
  ) { }

  ngOnInit() { }

  async ionViewWillEnter() {
    const _id = await this.storage.get('__institution');
    if (!_id) return;
    let data = await this.institutionsService.getInstitutionById(_id, `
      name
      education_level
      date_founded
      responsavel
      phone
      whatsapp
      email
      street
      number
      city
      state
      cep
      country
      text
      slug
    `);
    this.institution = data || {};
  }

  async save() {
    let res: any = await this.institutionsService.saveInstitution(this.institution);
    if (res?.status !== 'success')
      return this.alertsService.notify({ type: 'error', subtitle: 'Não foi possível salvar.' });
    this.alertsService.notify({ type: 'success', subtitle: 'Escola salva com sucesso.' });
  }
}
