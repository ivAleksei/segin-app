import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { AlertsService } from 'src/app/_shared/services/alerts.service';
import { LoadingService } from 'src/app/_shared/services/loading.service';
import { UtilsService } from 'src/app/_shared/services/utils.service';
import { environment } from 'src/environments/environment';
import { ClassesService } from 'src/app/_shared/providers/classes.service';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.page.html',
  styleUrls: ['./classes.page.scss'],
})
export class ClassesPage implements OnInit {
  @Output() public reloadTable: EventEmitter<any> = new EventEmitter();
  @ViewChild("modalClasse") modalClasse: any;
  @ViewChild('ClasseForm') ClasseForm: any;
  list_classes: any[] = [];

  tableInfo: any = {
    id: "table-classes",
    columns: [
      { title: 'Name', data: "name" },
    ],
    ajax: {
      url: `${environment.API.segin}/server_side/classes`,
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
    private loadingService: LoadingService,
    private classesService: ClassesService,
    private alertsService: AlertsService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getData();
  }

  getData() {
    this.loadClasse();
  }

  /**
   * loadClasse: Método que busca as viaturas para o autocomplete.
   */
  async loadClasse() {
    this.loadingService.show();
    let data = await this.classesService.getClasses();
    this.loadingService.hide();
    this.list_classes = (data || []).map(it => {
      it.label = [it.prefixo, it.placa].join(' - ');
      return it;
    });
  }

  handleTable(ev) {
    let map = {
      edit: () => {
        this.modalClasse.present();
        setTimeout(() => {
          this.ClasseForm.form.patchValue(ev.data);
        }, 400);
      },
      new: () => {
        this.modalClasse.present();
      },
      del: () => {
        this.classesService.delClasse(ev.data)
          .then(data => {
            if (data?.status != 'success')
              return this.alertsService.notify({ type: "error", subtitle: 'Classe não removido' });

            this.clearClasseForm();
            return this.alertsService.notify({ type: "success", subtitle: 'Classe removido com sucesso' });
          });
      },
    }

    return map[ev.action](ev.data);
  }

  saveForm() {
    this.loadingService.show();
    let obj = Object.assign({}, this.ClasseForm.value);
    this.classesService.saveClasse(obj)
      .then(data => {
        this.loadingService.hide();
        if (data?.status != 'success')
          return this.alertsService.notify({ type: "error", subtitle: 'Classe não atualizado' });

        this.clearClasseForm();
        return this.alertsService.notify({ type: "success", subtitle: 'Classe atualizado com sucesso' });
      });
  }

  clearClasseForm() {
    this.ClasseForm?.form.reset();
    this.closeModal();
    this.reloadTable.next(true);
  }

  closeModal() {
    this.modalClasse.dismiss();
  }

}
