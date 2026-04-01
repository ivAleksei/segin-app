import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { AlertsService } from 'src/app/_shared/services/alerts.service';
import { environment } from 'src/environments/environment';
import { I18nService } from 'src/app/_shared/services/i18n.service';
import { BannersService } from 'src/app/_shared/providers/banners.service';

@Component({
  selector: 'app-banners',
  templateUrl: './banners.page.html',
  styleUrls: ['./banners.page.scss'],
})
export class BannersPage implements OnInit {
  @Output() public reloadTable: EventEmitter<any> = new EventEmitter();
  @ViewChild('modalBanner') modalBanner: any;
  @ViewChild('BannerForm') BannerForm: any;

  tableInfo: any = {
    id: 'table-banners',
    columns: [
      { title: 'URL', data: 'url' },
      { title: 'Início', data: 'dt_start' },
      { title: 'Fim', data: 'dt_end' },
    ],
    ajax: { url: `${environment.API.segin}/server_side/banners` },
    actions: {
      buttons: [
        { action: 'edit', tooltip: 'Editar', class: 'btn-info', icon: 'mdi mdi-pencil' },
        { action: 'del', tooltip: 'Remover', class: 'btn-danger', icon: 'mdi mdi-close' },
      ]
    }
  };

  constructor(
    public i18n: I18nService,
    private bannersService: BannersService,
    private alertsService: AlertsService,
  ) { }

  ngOnInit() { }

  handleTable(ev) {
    const map: any = {
      edit: () => {
        this.modalBanner.present();
        setTimeout(() => this.BannerForm.form.patchValue(ev.data), 400);
      },
      new: () => this.modalBanner.present(),
      del: () => {
        this.bannersService.delBanner(ev.data).then((data: any) => {
          if (data?.status !== 'success') return;
          this.alertsService.notify({ type: 'success', subtitle: 'Banner removido.' });
          this.clearForm();
        });
      },
    };
    return map[ev.action](ev.data);
  }

  saveForm() {
    let obj = Object.assign({}, this.BannerForm.value);
    this.bannersService.saveBanner(obj).then((data: any) => {
      if (data?.status !== 'success')
        return this.alertsService.notify({ type: 'error', subtitle: 'Erro ao salvar.' });
      this.alertsService.notify({ type: 'success', subtitle: 'Banner salvo.' });
      this.clearForm();
    });
  }

  clearForm() {
    this.BannerForm?.form.reset();
    this.closeModal();
    this.reloadTable.next(true);
  }

  closeModal() { this.modalBanner.dismiss(); }
}
