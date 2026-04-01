import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { AlertsService } from 'src/app/_shared/services/alerts.service';
import { environment } from 'src/environments/environment';
import { I18nService } from 'src/app/_shared/services/i18n.service';
import { FilesService } from 'src/app/_shared/providers/files.service';

@Component({
  selector: 'app-files',
  templateUrl: './files.page.html',
  styleUrls: ['./files.page.scss'],
})
export class FilesPage implements OnInit {
  @Output() public reloadTable: EventEmitter<any> = new EventEmitter();
  @ViewChild('modalFile') modalFile: any;
  @ViewChild('FileForm') FileForm: any;

  tableInfo: any = {
    id: 'table-files',
    columns: [
      { title: 'Nome', data: 'name' },
      { title: 'URL', data: 'url' },
    ],
    ajax: { url: `${environment.API.segin}/server_side/files` },
    actions: {
      buttons: [
        { action: 'edit', tooltip: 'Editar', class: 'btn-info', icon: 'mdi mdi-pencil' },
        { action: 'del', tooltip: 'Remover', class: 'btn-danger', icon: 'mdi mdi-close' },
      ]
    }
  };

  constructor(
    public i18n: I18nService,
    private filesService: FilesService,
    private alertsService: AlertsService,
  ) { }

  ngOnInit() { }

  handleTable(ev) {
    const map: any = {
      edit: () => {
        this.modalFile.present();
        setTimeout(() => this.FileForm.form.patchValue(ev.data), 400);
      },
      new: () => this.modalFile.present(),
      del: () => {
        this.filesService.delFile(ev.data).then((data: any) => {
          if (data?.status !== 'success') return;
          this.alertsService.notify({ type: 'success', subtitle: 'Arquivo removido.' });
          this.clearForm();
        });
      },
    };
    return map[ev.action](ev.data);
  }

  saveForm() {
    let obj = Object.assign({}, this.FileForm.value);
    this.filesService.saveFile(obj).then((data: any) => {
      if (data?.status !== 'success')
        return this.alertsService.notify({ type: 'error', subtitle: 'Erro ao salvar.' });
      this.alertsService.notify({ type: 'success', subtitle: 'Arquivo salvo.' });
      this.clearForm();
    });
  }

  clearForm() {
    this.FileForm?.form.reset();
    this.closeModal();
    this.reloadTable.next(true);
  }

  closeModal() { this.modalFile.dismiss(); }
}
