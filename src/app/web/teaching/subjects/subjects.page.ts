import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { AlertsService } from 'src/app/_shared/services/alerts.service';
import { environment } from 'src/environments/environment';
import { I18nService } from 'src/app/_shared/services/i18n.service';
import { SubjectsService } from 'src/app/_shared/providers/subjects.service';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.page.html',
  styleUrls: ['./subjects.page.scss'],
})
export class SubjectsPage implements OnInit {
  @Output() public reloadTable: EventEmitter<any> = new EventEmitter();
  @ViewChild('modalSubject') modalSubject: any;
  @ViewChild('SubjectForm') SubjectForm: any;

  tableInfo: any = {
    id: 'table-subjects',
    columns: [
      { title: 'Nome', data: 'name' },
      { title: 'Código', data: 'alias' },
    ],
    ajax: { url: `${environment.API.segin}/server_side/subjects` },
    actions: {
      buttons: [
        { action: 'edit', tooltip: 'Editar', class: 'btn-info', icon: 'mdi mdi-pencil' },
        { action: 'del', tooltip: 'Remover', class: 'btn-danger', icon: 'mdi mdi-close' },
      ]
    }
  };

  constructor(
    public i18n: I18nService,
    private subjectsService: SubjectsService,
    private alertsService: AlertsService,
  ) { }

  ngOnInit() { }

  ionViewWillEnter() { }

  handleTable(ev) {
    const map: any = {
      edit: () => {
        this.modalSubject.present();
        setTimeout(() => this.SubjectForm.form.patchValue(ev.data), 400);
      },
      new: () => this.modalSubject.present(),
      del: () => {
        this.subjectsService.delSubject(ev.data).then((data: any) => {
          if (data?.status !== 'success')
            return this.alertsService.notify({ type: 'error', subtitle: 'Disciplina não removida.' });
          this.clearForm();
          this.alertsService.notify({ type: 'success', subtitle: 'Disciplina removida com sucesso.' });
        });
      },
    };
    return map[ev.action](ev.data);
  }

  saveForm() {
    let obj = Object.assign({}, this.SubjectForm.value);
    this.subjectsService.saveSubject(obj).then((data: any) => {
      if (data?.status !== 'success')
        return this.alertsService.notify({ type: 'error', subtitle: 'Disciplina não salva.' });
      this.clearForm();
      this.alertsService.notify({ type: 'success', subtitle: 'Disciplina salva com sucesso.' });
    });
  }

  clearForm() {
    this.SubjectForm?.form.reset();
    this.closeModal();
    this.reloadTable.next(true);
  }

  closeModal() { this.modalSubject.dismiss(); }
}
