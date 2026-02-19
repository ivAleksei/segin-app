import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InstitutionsService } from 'src/app/_shared/providers/institutions.service';
import { UserService } from 'src/app/_shared/providers/user.service';
import { AlertsService } from 'src/app/_shared/services/alerts.service';
import { HttpService } from 'src/app/_shared/services/http.service';
import { LocalStorageService } from 'src/app/_shared/services/local-storage.service';
import { UtilsService } from 'src/app/_shared/services/utils.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-institution-data',
  templateUrl: './institution-data.page.html',
  styleUrls: ['./institution-data.page.scss'],
})
export class InstitutionDataPage implements OnInit {
  @ViewChild('InfoForm') InfoForm: any;
  @Output() public inputEvent: EventEmitter<any> = new EventEmitter();
  @Output() public clearEvent: EventEmitter<any> = new EventEmitter();


  @Input() _id: any;
  @Input() edit: any;
  user: any;
  institution: any;
  files: any = {}
  categories_list: any = []


  constructor(
    private storage: LocalStorageService,
    private http: HttpService,
    private utils: UtilsService,
    private userService: UserService,
    private alertsService: AlertsService,
    private institutionsService: InstitutionsService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(async (params: any) => {
      this._id = params?.id || null;
      this.setupPage();
    })
  }

  ngOnInit() {
  }

  async setupPage() {
    await this.getUser();
    this.getData()
  }

  async getUser() {
    let data = await this.storage.get('user');
    this.user = data || null;
    if (!this.user)
      this.userService.logOut();
  }

  handleTable(ev) {
    let handle = {
      save: (ev) => this.saveData(),
    };

    return handle[ev.action](ev);
  }

  async getData() {
    if (!this._id) return;
    this.institution = await this.institutionsService.getInstitutionById(this._id, `
      cgc
      name
      
      phone
      email
      responsavel
      
      text
      
      img
      img_sm
    `);
    if (!this.institution) this.institution = {};
    if (this.institution?.cgc)
      this.institution.type_cgc = this.institution?.cgc?.length == 11 ? 'CPF' : 'CNPJ'
    this.InfoForm.form.patchValue(this.institution);

    this.inputEvent.next(this.institution?._categoria)
  }

  clearCGC() {
    this.InfoForm.form.patchValue({ cgc: null });
  }

  saveData() {
    let obj = Object.assign({}, this.InfoForm.value);
    delete obj.type_cgc;

    return Promise.resolve(true)
      .then(async start => {
        if (!this.files['img'] && !this.files['img_sm']) return obj;

        if (this.files['img']) {
          let url = [environment.API.storage, 'uploads', 'index.php'].join("/");
          let data_upl = await this.http.post(url, { id: this._id, folder: 'segin-institutions' }, { arquivo: this.files['img'] });
          obj.img = data_upl || null;
        }

        if (this.files['img_sm']) {
          let url = [environment.API.storage, 'uploads', 'index.php'].join("/");
          let data_upl = await this.http.post(url, { id: this._id, folder: 'segin-institutions' }, { arquivo: this.files['img_sm'] });
          obj.img_sm = data_upl || null;
        }

        return obj;
      })
      .then(data => {
        return this.institutionsService.saveInstitution(data)
      })
      .then(data => {
        if (data?.status != 'success')
          return this.alertsService.notify({ type: "error", subtitle: "Institution não foi registrado" });

        this.getData();
        return this.alertsService.notify({ type: "success", subtitle: "Institution registrado com sucesso" });
      });
  }

  getFile(key) {
    $(`#input_${key}`).click();
  }


  async fileSelect(ev, prop) {
    let files = ev?.target?.files;
    if (!files || !files.length) return;


    let file = files[0];
    if (!file) return;

    let ext = file.name.split('.').slice(-1)[0];
    // valida formato e tamanho
    if (!['jpg', 'png', 'jpeg'].includes(ext)) {
      this.alertsService.notify({ type: "info", subtitle: 'Formato de arquivo não experado.' });
      return;
    }

    this.files[prop] = file;
    let base64 = await this.utils.getBase64(file)

    this.institution[prop] = { url: base64 };
    ev.target.value = '';
  }
}
