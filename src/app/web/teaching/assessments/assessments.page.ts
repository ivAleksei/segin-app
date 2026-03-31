import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { AlertsService } from 'src/app/_shared/services/alerts.service';
import { environment } from 'src/environments/environment';
import { I18nService } from 'src/app/_shared/services/i18n.service';
import { AssessmentsService } from 'src/app/_shared/providers/assessments.service';

@Component({
  selector: 'app-assessments',
  templateUrl: './assessments.page.html',
  styleUrls: ['./assessments.page.scss'],
})
export class AssessmentsPage implements OnInit {
  @Output() public reloadTable: EventEmitter<any> = new EventEmitter();
  @ViewChild('modalAssessment') modalAssessment: any;
  @ViewChild('AssessmentForm') AssessmentForm: any;

  tableInfo: any = {
    id: 'table-assessments',
    columns: [
      { title: 'Título', data: 'title' },
      { title: 'Tipo', data: 'type' },
      { title: 'Data', data: 'date' },
    ],
    ajax: { url: `${environment.API.segin}/server_side/assessments` },
    actions: {
      buttons: [
        { action: 'edit', tooltip: 'Editar', class: 'btn-info', icon: 'mdi mdi-pencil' },
        { action: 'del', tooltip: 'Remover', class: 'btn-danger', icon: 'mdi mdi-close' },
      ]
    }
  };

  constructor(
    public i18n: I18nService,
    private assessmentsService: AssessmentsService,
    private alertsService: AlertsService,
  ) { }

  ngOnInit() { }

  ionViewWillEnter() { }

  handleTable(ev) {
    const map: any = {
      edit: () => {
        this.modalAssessment.present();
        setTimeout(() => this.AssessmentForm.form.patchValue(ev.data), 400);
      },
      new: () => this.modalAssessment.present(),
      del: () => {
        this.assessmentsService.delAssessment(ev.data).then((data: any) => {
          if (data?.status !== 'success')
            return this.alertsService.notify({ type: 'error', subtitle: 'Avaliação não removida.' });
          this.clearForm();
          this.alertsService.notify({ type: 'success', subtitle: 'Avaliação removida com sucesso.' });
        });
      },
    };
    return map[ev.action](ev.data);
  }

  saveForm() {
    let obj = Object.assign({}, this.AssessmentForm.value);
    this.assessmentsService.saveAssessment(obj).then((data: any) => {
      if (data?.status !== 'success')
        return this.alertsService.notify({ type: 'error', subtitle: 'Avaliação não salva.' });
      this.clearForm();
      this.alertsService.notify({ type: 'success', subtitle: 'Avaliação salva com sucesso.' });
    });
  }

  clearForm() {
    this.AssessmentForm?.form.reset();
    this.closeModal();
    this.reloadTable.next(true);
  }

  closeModal() { this.modalAssessment.dismiss(); }
}
