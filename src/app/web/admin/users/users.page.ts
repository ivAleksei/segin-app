import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { AlertsService } from 'src/app/_shared/services/alerts.service';
import { LoadingService } from 'src/app/_shared/services/loading.service';
import { UtilsService } from 'src/app/_shared/services/utils.service';
import { environment } from 'src/environments/environment';
import { UsersService } from 'src/app/_shared/providers/users.service';
import { RolesService } from 'src/app/_shared/providers/roles.service';
import { I18nService } from 'src/app/_shared/services/i18n.service';
import md5 from 'md5';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {
  @Output() public reloadTable: EventEmitter<any> = new EventEmitter();
  @Output() public clearEvent: EventEmitter<any> = new EventEmitter();

  @ViewChild("modalUser") modalUser: any;
  @ViewChild("UserForm") UserForm: any;

  edit: any;
  user: any;
  filt_roles: any = [];
  user_roles: any = [];
  roles: any = [];

  tableInfo: any = {
    id: "table-users",
    columns: [
      { title: 'Últ. Atualização', data: "updated_at", datatype: "pipe", pipe: "DatePipe", options: "DD/MM/YYYY HH:mm" },
      { title: 'Email', data: "email" },
      { title: 'Perfis', data: "_roles", render: (a, b, c) => (c._roles || []).join(',') },
    ],
    ajax: {
      url: `${environment.API.admin}/server_side/users`,
    },
    actions: {
      buttons: [
        { action: "permissions", tooltip: "Permissões", class: "btn-info", icon: "mdi mdi-format-list-checks" },
        { action: "reset", tooltip: "Resetar Senha", class: "btn-warning", icon: "mdi mdi-account-key" },
        { action: "del", tooltip: "Remove", class: "btn-danger", icon: "mdi mdi-close" },
      ]
    }
  }

  constructor(
    public i18n: I18nService,
    private utils: UtilsService,
    private loadingService: LoadingService,
    private usersService: UsersService,
    private alertsService: AlertsService,
    private rolesService: RolesService
  ) { }

  ngOnInit() { }

  ionViewWillEnter() {
    this.getData();
  }

  getData() {
    this.getRoles();
  }

  async getRoles() {
    let data = await this.rolesService.getRoles(`
      label
    `);
    this.roles = data || [];
  }

  handleTable(ev) {
    console.log(ev);

    let map = {
      reset: () => this.resetPassword(ev.data),
      permissions: () => this.openModal(ev.data),

      del: () => {
        this.usersService.delUser(ev.data)
          .then(data => {
            if (data?.status != 'success')
              return this.alertsService.notify({ type: "error", subtitle: this.i18n.lang.USER_NOT_REMOVED });

            this.clear();
            return this.alertsService.notify({ type: "success", subtitle: this.i18n.lang.USER_REMOVED_SUCCESS });
          });
      },
    }

    return map[ev.action](ev.data);
  }

  saveForm() {
    this.loadingService.show();
    let obj = Object.assign({}, this.UserForm.value);

    // ✅ Se vier senha em texto, mantém teu padrão de reset (md5)
    // (não obriga senha na edição; só aplica hash se tiver valor)
    if (obj?.password && String(obj.password).trim().length)
      obj.password = md5(String(obj.password).trim());
    else
      delete obj.password;

    this.usersService.saveUser(obj)
      .then(data => {
        this.loadingService.hide();
        if (data?.status != 'success')
          return this.alertsService.notify({ type: "error", subtitle: this.i18n.lang.USER_NOT_UPDATED });

        this.clear();
        return this.alertsService.notify({ type: "success", subtitle: this.i18n.lang.USER_UPDATED_SUCCESS });
      });
  }

  // ✅ função adicional mantida (modal de permissões/roles)
  async openModal(obj?: any) {
    this.filt_roles = [];
    this.user_roles = [];

    if (!obj) obj = {};
    this.user = obj;

    let info = await this.usersService.getUserById(obj._id, `
      _roles
    `);

    this.modalUser.present();
    setTimeout(() => {
      let map_permissions = {};
      for (let p of (info?._roles || []))
        map_permissions[p] = 1;

      this.user_roles = Object.keys(map_permissions || {});
      this.filt_roles = (this.roles || []).filter(it => !map_permissions[it._id]);

      this.UserForm.form.patchValue({
        _id: obj._id,
      })
    }, 400);
  }

  // ✅ função adicional mantida
  async addRoleUser(role) {
    if (!role) return;
    await this.rolesService.setUserRole({
      _id: this.user._id,
      _role: role._id
    });

    this.user_roles = [...(this.user_roles || []), role._id];
    this.clearEvent.next(true);
  }

  // ✅ função adicional mantida
  async rmUserRole(role) {
    let confirm = await this.alertsService.confirmDel();
    if (!confirm) return;

    await this.rolesService.rmUserRole({
      _id: this.user._id,
      _role: role
    });
    this.user_roles = (this.user_roles || []).filter(r => r != role);
  }

  // ✅ função adicional mantida
  async resetPassword(obj) {
    let confirm = await this.alertsService.askConfirmation(
      this.i18n.lang.RESET_PASSWORD,
      this.i18n.lang.RESET_PASSWORD_ASK
    )
    if (confirm == 'false') return;

    let payload = { _id: obj._id, password: md5("mudar123") };

    return this.usersService.saveUser(payload)
      .then(data => {
        if (data?.status != 'success')
          return this.alertsService.notify({ type: "error", subtitle: this.i18n.lang.USER_NOT_UPDATED });

        this.clear();
        return this.alertsService.notify({ type: "success", subtitle: this.i18n.lang.USER_UPDATED_SUCCESS });
      });
  }

  clear() {
    this.UserForm?.form.reset();
    this.user = null;
    this.closeModal();
    this.edit = false;
  }

  closeModal() {
    this.modalUser.dismiss();
    this.reloadTable.next(true);
  }
}
