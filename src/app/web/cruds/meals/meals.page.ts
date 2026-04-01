import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { AlertsService } from 'src/app/_shared/services/alerts.service';
import { environment } from 'src/environments/environment';
import { I18nService } from 'src/app/_shared/services/i18n.service';
import { MealsService } from 'src/app/_shared/providers/meals.service';

@Component({
  selector: 'app-meals',
  templateUrl: './meals.page.html',
  styleUrls: ['./meals.page.scss'],
})
export class MealsPage implements OnInit {
  @Output() public reloadTable: EventEmitter<any> = new EventEmitter();
  @ViewChild('modalMeal') modalMeal: any;
  @ViewChild('MealForm') MealForm: any;

  tableInfo: any = {
    id: 'table-meals',
    columns: [
      { title: 'Aluno (_id)', data: '_student' },
      { title: 'Turma (_id)', data: '_classe' },
    ],
    ajax: { url: `${environment.API.segin}/server_side/meals` },
    actions: {
      buttons: [
        { action: 'edit', tooltip: 'Editar', class: 'btn-info', icon: 'mdi mdi-pencil' },
        { action: 'del', tooltip: 'Remover', class: 'btn-danger', icon: 'mdi mdi-close' },
      ]
    }
  };

  constructor(
    public i18n: I18nService,
    private mealsService: MealsService,
    private alertsService: AlertsService,
  ) { }

  ngOnInit() { }

  handleTable(ev) {
    const map: any = {
      edit: () => {
        this.modalMeal.present();
        setTimeout(() => this.MealForm.form.patchValue(ev.data), 400);
      },
      new: () => this.modalMeal.present(),
      del: () => {
        this.mealsService.delMeal(ev.data).then((data: any) => {
          if (data?.status !== 'success') return;
          this.alertsService.notify({ type: 'success', subtitle: 'Refeição removida.' });
          this.clearForm();
        });
      },
    };
    return map[ev.action](ev.data);
  }

  saveForm() {
    let obj = Object.assign({}, this.MealForm.value);
    this.mealsService.saveMeal(obj).then((data: any) => {
      if (data?.status !== 'success')
        return this.alertsService.notify({ type: 'error', subtitle: 'Erro ao salvar.' });
      this.alertsService.notify({ type: 'success', subtitle: 'Refeição salva.' });
      this.clearForm();
    });
  }

  clearForm() {
    this.MealForm?.form.reset();
    this.closeModal();
    this.reloadTable.next(true);
  }

  closeModal() { this.modalMeal.dismiss(); }
}
