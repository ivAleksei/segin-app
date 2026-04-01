import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { AlertsService } from 'src/app/_shared/services/alerts.service';
import { environment } from 'src/environments/environment';
import { I18nService } from 'src/app/_shared/services/i18n.service';
import { JournalsService } from 'src/app/_shared/providers/journals.service';

@Component({
  selector: 'app-journals',
  templateUrl: './journals.page.html',
  styleUrls: ['./journals.page.scss'],
})
export class JournalsPage implements OnInit {
  @Output() public reloadTable: EventEmitter<any> = new EventEmitter();
  @ViewChild('modalJournal') modalJournal: any;
  @ViewChild('JournalForm') JournalForm: any;

  tableInfo: any = {
    id: 'table-journals',
    columns: [
      { title: 'Aluno (_id)', data: '_student' },
      { title: 'Data', data: 'date' },
      { title: 'Texto', data: 'text' },
    ],
    ajax: { url: `${environment.API.segin}/server_side/journals` },
    actions: {
      buttons: [
        { action: 'edit', tooltip: 'Editar', class: 'btn-info', icon: 'mdi mdi-pencil' },
        { action: 'del', tooltip: 'Remover', class: 'btn-danger', icon: 'mdi mdi-close' },
      ]
    }
  };

  constructor(
    public i18n: I18nService,
    private journalsService: JournalsService,
    private alertsService: AlertsService,
  ) { }

  ngOnInit() { }

  handleTable(ev) {
    const map: any = {
      edit: () => {
        this.modalJournal.present();
        setTimeout(() => this.JournalForm.form.patchValue(ev.data), 400);
      },
      new: () => this.modalJournal.present(),
      del: () => {
        this.journalsService.delJournal(ev.data).then((data: any) => {
          if (data?.status !== 'success') return;
          this.alertsService.notify({ type: 'success', subtitle: 'Diário removido.' });
          this.clearForm();
        });
      },
    };
    return map[ev.action](ev.data);
  }

  saveForm() {
    let obj = Object.assign({}, this.JournalForm.value);
    this.journalsService.saveJournal(obj).then((data: any) => {
      if (data?.status !== 'success')
        return this.alertsService.notify({ type: 'error', subtitle: 'Erro ao salvar.' });
      this.alertsService.notify({ type: 'success', subtitle: 'Diário salvo.' });
      this.clearForm();
    });
  }

  clearForm() {
    this.JournalForm?.form.reset();
    this.closeModal();
    this.reloadTable.next(true);
  }

  closeModal() { this.modalJournal.dismiss(); }
}
