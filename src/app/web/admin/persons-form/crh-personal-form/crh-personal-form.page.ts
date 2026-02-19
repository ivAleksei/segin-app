import { Component, Input, OnInit, ViewChild } from '@angular/core';
import moment from 'moment';
import { PersonsService } from 'src/app/_shared/providers/persons.service';
import { ResourcesService } from 'src/app/_shared/providers/resources.service';
import { AlertsService } from 'src/app/_shared/services/alerts.service';
import { HttpService } from 'src/app/_shared/services/http.service';
import { LoadingService } from 'src/app/_shared/services/loading.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-crh-personal-form',
  templateUrl: './crh-personal-form.page.html',
  styleUrls: ['./crh-personal-form.page.scss'],
})
export class CrhPersonalFormPage implements OnInit {
  @ViewChild("InfoForm") InfoForm: any;
  @ViewChild("AddressForm") AddressForm: any;
  @ViewChild("ContactForm") ContactForm: any;
  @Input() edit: any;
  @Input() _id: any;
  info: any;
  str_nomecurto: any;

  today: any = moment().format();
  op_relig_list: any = [];
  sanguineos_list: any = [];
  est_civil_list: any = [];
  bank_list: any = [];
  data_cidades_estados: any = [];
  list_cidades: any = [];
  list_cidades_endereco: any = [];

  constructor(
    private http: HttpService,
    private alertsService: AlertsService,
    private loadingService: LoadingService,
    private personsService: PersonsService,
    private resourcesService: ResourcesService
  ) { }

  ngOnInit() {
    this.setupPage();
  }

  setupPage() {
    this.getReligioes();
    this.getEstCivil();
    this.getEstadosCidade();
    this.getTiposSanguineos();

    this.getPersonData();
  }

  async getPersonData() {
    let data = await this.personsService.getPersonInfo({ _id: this._id }, ``);
    this.info = data || null;
    this.str_nomecurto = data?.short_name || null;
    // INFO FORM
    this.InfoForm.form.patchValue({
      str_nome: data?.name,
      dt_nascimento: data?.birth_date,
      str_sexo: data?.gender,
      str_tipo_sanguineo: data?.blood,
      filiacao_mae: data?.filiacao_mae,
      filiacao_pai: data?.filiacao_pai,
      str_ufnaturalidade: data?.naturalidade?.uf,
      str_naturalidade: data?.naturalidade?.cidade,
      op_religiao: data?.op_religiao,
      est_civil: data?.est_civil,
    })
    if (this.InfoForm?.value.str_ufnaturalidade) {
      this.setListCidade(data?.naturalidade?.uf, 'list_cidades', () => {
        this.InfoForm.form.patchValue({ str_naturalidade: data?.naturalidade?.cidade })
      })
    }
    this.AddressForm.form.patchValue({
      str_cep: data?.address?.postal_code,
      str_endereco: data?.address?.line1,
      str_numero: data?.address?.line2,
      str_complemento: data?.address?.line3,
      str_bairro: data?.address?.neighborhood,
      str_cidade: data?.address?.city,
      str_uf: data?.address?.state,
      str_pontoreferencia: data?.address?.ref
    })
    if (this.AddressForm?.value.str_uf) {
      this.setListCidade(data?.address?.state, 'list_cidades_endereco', () => {
        this.AddressForm.form.patchValue({ str_cidade: data?.address?.city })
      });
    }
    // INFO FORM 
    this.ContactForm.form.patchValue({
      str_email: data?.email,
      str_telefone: data?.phone_fix,
      str_telefonecelular: data?.phone,
    })
  }


  async getEstadosCidade() {
    let data = await this.resourcesService.getEstadosCidade();
    this.data_cidades_estados = data || [];
  }

  async getTiposSanguineos() {
    let data = await this.resourcesService.getTiposSanguineos();
    this.sanguineos_list = data || [];
  }

  setListCidade(uf, prop, cb?) {
    this[prop] = this.data_cidades_estados.find(it => it.sigla == uf)?.cidades || [];
    if (cb) cb();
  }

  async getReligioes() {
    let data = await this.resourcesService.getReligioes();
    this.op_relig_list = data || [];
  }
  async getEstCivil() {
    let data = await this.resourcesService.getEstCivil();
    this.est_civil_list = data || [];
  }

  async searchCEP() {
    let obj = Object.assign({}, this.AddressForm.value);
    if (obj.str_cep?.length != 8) return;
    this.loadingService.show();
    let url = [environment.API.segin, 'ws', 'cep', obj.str_cep].join('/');

    let data = await this.http.get(url);
    this.loadingService.hide();
    if (data) {
      this.AddressForm.form.patchValue({
        str_endereco: data?.line1 || null,
        str_numero: null,
        str_complemento: null,
        str_bairro: data?.neighborhood || null,
        str_cidade: data?.city || null,
        str_uf: data?.state || null
      });
      this.setListCidade(data?.state, 'list_cidades_endereco', () => {
        this.AddressForm.form.patchValue({ str_cidade: data?.city })
      });
      $('#str_numero').focusin();
    }
  }


  saveData() {

    let form_info = Object.assign({}, this.InfoForm.value);
    let form_address = Object.assign({}, this.AddressForm.value);
    let form_contact = Object.assign({}, this.ContactForm.value);

    let payload: any = {
      _id: this._id,
      // INFO FORM
      name: form_info?.str_nome || null,
      birth_date: form_info?.dt_nascimento || null,
      gender: form_info?.str_sexo || null,
      blood: form_info?.str_tipo_sanguineo || null,
      filiacao_pai: form_info?.filiacao_pai,
      filiacao_mae: form_info?.filiacao_mae,
      naturalidade: {
        cidade: form_info?.str_naturalidade || null,
        uf: form_info?.str_ufnaturalidade || null,
      },
      op_religiao: form_info?.op_religiao || null,
      est_civil: form_info?.est_civil || null,
      // ADDRESS FORM
      address: {
        postal_code: form_address?.str_cep || null,
        line1: form_address?.str_endereco || null,
        line2: form_address?.str_numero || null,
        line3: form_address?.str_complemento || null,
        neighborhood: form_address?.str_bairro || null,
        city: form_address?.str_cidade || null,
        state: form_address?.str_uf || null,
        country: form_address.country || null,
        ref: form_address?.str_pontoreferencia || null,
      },
      // CONTACT FORM
      email: form_contact?.str_email || null,
      phone: form_contact?.str_telefonecelular || null,
      phone_fix: form_contact?.str_telefone || null,
    };
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

  toUpper(prop, ev) {
    let str = ev.target.value.toLocaleUpperCase();
    let payload;
    for (let k of prop.split('.').reverse())
      payload = !payload ? { [k]: str } : { [k]: payload };

    this.AddressForm.form.patchValue(payload)
  }
}
