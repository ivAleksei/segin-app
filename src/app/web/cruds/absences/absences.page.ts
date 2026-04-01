import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { AlertsService } from 'src/app/_shared/services/alerts.service';
import { environment } from 'src/environments/environment';
import { I18nService } from 'src/app/_shared/services/i18n.service';
import { AbsencesService } from 'src/app/_shared/providers/absences.service';

@Component({
  selector: 'app-absences',
  templateUrl: './absences.page.html',
  styleUrls: ['./absences.page.scss'],
})
export class AbsencesPage implements OnInit {
  @Output() public reloadTable: EventEmitter<any> = new EventEmitter();
  @ViewChild('modalAbsence') modalAbsence: any;
  @ViewChild('AbsenceForm') AbsenceForm: any;

  tableInfo: any = {
    id: 'table-absences',
    columns: [
      { title: 'Aluno (_id)', data: '_student' },
      { title: 'Data', data: 'date' },
      { title: 'Justificado', data: 'justified', render: (v) => v ? 'Sim' : 'Não' },
    ],
    ajax: { url: `${environment.API.segin}/server_side/absences` },
    actions: {
      buttons: [
        { action: 'edit', tooltip: 'Editar', class: 'btn-info', icon: 'mdi mdi-pencil' },
        { action: 'del', tooltip: 'Remover', class: 'btn-danger', icon: 'mdi mdi-close' },
      ]
    }
  };

  constructor(
    public i18n: I18nService,
    private absencesService: AbsencesService,
    private alertsService: AlertsService,
  ) { }

  ngOnInit() { }

  handleTable(ev) {
    const map: any = {
      edit: () => {
        this.modalAbsence.present();
        setTimeout(() => this.AbsenceForm.form.patchValue(ev.data), 400);
      },
      new: () => this.modalAbsence.present(),
      del: () => {
        this.absencesService.delAbsence(ev.data).then((data: any) => {
          if (data?.status !== 'success') return;
          this.alertsService.notify({ type: 'success', subtitle: 'Falta removida.' });
          this.clearForm();
        });
      },
    };
    return map[ev.action](ev.data);
  }

  saveForm() {
    let obj = Object.assign({}, this.AbsenceForm.value);
    if (obj.justified === '') obj.justified = false;
    this.absencesService.saveAbsence(obj).then((data: any) => {
      if (data?.status !== 'success')
        return this.alertsService.notify({ type: 'error', subtitle: 'Erro ao salvar.' });
      this.alertsService.notify({ type: 'success', subtitle: 'Falta salva.' });
      this.clearForm();
    });
  }

  clearForm() {
    this.AbsenceForm?.form.reset();
    this.closeModal();
    this.reloadTable.next(true);
  }

  closeModal() { this.modalAbsence.dismiss(); }
}
