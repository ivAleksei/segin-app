import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { NavController } from '@ionic/angular';
import { AlertsService } from 'src/app/_shared/services/alerts.service';
import { LoadingService } from 'src/app/_shared/services/loading.service';
import { HttpService } from 'src/app/_shared/services/http.service';
import { LocalStorageService } from 'src/app/_shared/services/local-storage.service';
import { PersonsService } from 'src/app/_shared/providers/persons.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.page.html',
  styleUrls: ['./persons.page.scss'],
})
export class PersonsPage implements OnInit {
  @Output() public reloadTable: EventEmitter<any> = new EventEmitter();
  @Output() public openModal: EventEmitter<any> = new EventEmitter();

  edit: any;
  tableInfo: any;

  personsSub: Subscription;
  raw_persons: any;

  type: any;
  modal: any;


  float_btns: any = [
    {
      action: "model",
      flow: "down",
      label: "Baixar Modelo",
      tooltip: "Baixar Modelo",
      color: "medium",
      icon: "mdi mdi-download",
    },
    {
      action: "import",
      flow: "down",
      label: "Importar CSV",
      tooltip: "Importar CSV",
      color: "success",
      icon: "mdi mdi-file-excel",
    },
    {
      action: "new",
      flow: "down",
      label: "Adicionar Pessoa",
      tooltip: "Adicionar Pessoa",
      color: "primary",
      icon: "mdi mdi-plus",
    },
  ]

  constructor(
    private http: HttpService,
    private storage: LocalStorageService,
    private LoadingService: LoadingService,
    private alertsService: AlertsService,
    private nav: NavController,
    private personsService: PersonsService
  ) {

    this.type = location.hash.split('/').slice(-1)[0];

    this.personsSub = this.personsService.watch.subscribe(ev => {
      this.reloadTable.next(true);
    });
  }


  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getData();
  }

  ionViewDidEnter() {
  }

  getData() {
    this.setTableInfo();

    this.getPersons();
  }

  async setTableInfo() {
    return Promise.resolve(true)
      .then(start => {
        this.tableInfo = {
          id: `table-persons-${this.type}`,
          columns: [
            { title: '#', data: "index" },
            { title: 'Matrícula', data: "regist", datatype: "pipe", pipe: "CustomFormatPipe", options: "999.999-9" },
            { title: 'Nome', data: "name" },
          ],
          actions: {
            buttons: [
              {
                action: "edit",
                tooltip: "Editar",
                class: "btn-info",
                icon: "mdi mdi-pencil",
              },
              {
                action: "remove",
                tooltip: "Remover",
                class: "btn-danger",
                icon: "mdi mdi-delete",
              },
            ],
          },
          data: []
        };
      })
      .then(done => this.reloadTable.next(true))
  }

  async getPersons() {
    let data = await this.personsService.getPersons({ type: this.type }, ``);
    this.raw_persons = data || [];

    this.tableInfo.data = (this.raw_persons || []);
    this.reloadTable.next(true);
  }



  handleTable(ev) {
    let handle = {
      'new': (ev) => this.newMilitar(),
      'reload': (ev) => this.reloadTable.next(true),
      edit: (ev) => this.formPerson(ev.data),
      remove: (ev) => this.delPerson(ev.data)
    };

    return handle[ev.action](ev);
  }
  newMilitar() {
    this.openModal.next({ type: "pessoa" });
  }

  editPerson(obj) {
    this.edit = true;

    if (obj.profiles)
      obj.profiles = JSON.parse(obj.profiles || "{}");
  }

  delPerson(obj) {
    if (!obj || !obj._id) return;

    return this.alertsService.confirmDel()
      .then(confirm => {
        if (!confirm) return;
        return this.personsService.delPerson(obj)
          .then(done => {
            this.reloadTable.next(true);
          })
      })
  }

  clear() {
    this.edit = false;
    this.reloadTable.next(true);
  }


  savePerson(data) {
    return this.personsService.savePerson(data);
  }

  async formPerson(obj?: any) {
    if (!obj) obj = {};

    this.nav.navigateForward(['/internal/admin/persons-form', obj._id].join('/'));
  }


  getCSV() {
    $('#input_persons').click();
  }

  downloadXLSX() {
    let url = [environment.API.segin, 'docs', 'import_persons'].join('/');
    window.open(url, '_blank');
  }

  importCSV(file) {
    this.LoadingService.show();
    let url = [environment.API.segin, 'uploads', 'persons_csv'].join('/');
    return this.http.post(url, {}, [file])
      .then(done => {
        this.LoadingService.hide();

        if (done) {

          this.clear();
          return this.alertsService.notify({ type: "success", subtitle: "Arquivo importado com sucesso." });
        }
      })
  }


  fileSelect(ev) {
    let files = ev?.target?.files;
    if (!files || !files.length) return;

    let csv = files[0];
    if (!csv) return;

    let ext = csv.name.split('.').slice(-1)[0];
    // valida formato e tamanho
    if (ext != 'csv') {
      this.alertsService.notify({ type: "warning", subtitle: 'Arquivo deve ter a extensão .csv' });
      return;
    }

    this.importCSV(csv);
  }


  filters: any = [
    { index: 0, prop: 'text', type: 'text', label: "Nome, Matrícula,  CPF", size: 6 }
  ]

  handleFilter(ev) {
    console.log(ev);
    this.tableInfo.data = (this.raw_persons || []).filter(it => {
      if (ev.input0) {
        if ((it.regist || "").includes(ev.input0)) return true;
        if ((it.cgc || "").includes(ev.input0)) return true;
        if ((it.short_name || "").toLocaleLowerCase().includes(ev.input0)) return true;
        if ((it.name || "").toLocaleLowerCase().includes(ev.input0)) return true;

        return false;
      }

      return it;
    });
    this.reloadTable.next(true);
  }
}
