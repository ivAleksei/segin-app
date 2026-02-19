import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { AlertsService } from 'src/app/_shared/services/alerts.service';
import { LoadingService } from 'src/app/_shared/services/loading.service';
import { environment } from 'src/environments/environment';
import { I18nService } from 'src/app/_shared/services/i18n.service';

import { PermissionsService } from 'src/app/_shared/providers/permissions.service';
import { RolesService } from 'src/app/_shared/providers/roles.service';

@Component({
  selector: 'app-access-control',
  templateUrl: './access-control.page.html',
  styleUrls: ['./access-control.page.scss'],
})
export class AccessControlPage implements OnInit {
  @Output() public reloadTablePermissions: EventEmitter<any> = new EventEmitter();
  @Output() public reloadTableRoles: EventEmitter<any> = new EventEmitter();

  @ViewChild("modalPermission") modalPermission: any;
  @ViewChild("PermissionForm") PermissionForm: any;

  @ViewChild("modalRole") modalRole: any;
  @ViewChild("RoleForm") RoleForm: any;

  tab: string = 'roles';

  permissions: any[] = [];
  roles: any[] = [];

  role: any;
  role_permissions: string[] = [];
  filt_permissions: any[] = [];

  tablePermissions: any = {
    id: "table-permissions",
    columns: [
      { title: 'Chave', data: "_id" },
      { title: 'Descrição', data: "description" },
      { title: 'Últ. Atualização', data: "updated_at", datatype: "pipe", pipe: "DatePipe", options: "DD/MM/YYYY HH:mm" },
    ],
    ajax: { url: `${environment.API.admin}/server_side/permissions` },
    actions: {
      buttons: [
        // { action: "edit", tooltip: "Editar", class: "btn-info", icon: "mdi mdi-pencil" },
        // { action: "del", tooltip: "Remove", class: "btn-danger", icon: "mdi mdi-close" }
      ]
    }
  }

  tableRoles: any = {
    id: "table-roles",
    columns: [
      { title: 'Chave', data: "_id" },
      { title: 'Perfil', data: "label" },
      { title: 'Descrição', data: "description" },
      { title: 'Permissões', data: "_permissions", render: (a, b, c) => (c._permissions || []).length },
      { title: 'Últ. Atualização', data: "updated_at", datatype: "pipe", pipe: "DatePipe", options: "DD/MM/YYYY HH:mm" },
    ],
    ajax: { url: `${environment.API.admin}/server_side/roles` },
    actions: {
      buttons: [
        // { action: "edit", tooltip: "Editar", class: "btn-info", icon: "mdi mdi-pencil" },
        // { action: "del", tooltip: "Remove", class: "btn-danger", icon: "mdi mdi-close" },
        { action: "permissions", tooltip: "Permissões", class: "btn-warning", icon: "mdi mdi-format-list-checks" },
      ]
    }
  }

  constructor(
    public i18n: I18nService,
    private loadingService: LoadingService,
    private alertsService: AlertsService,
    private permissionsService: PermissionsService,
    private rolesService: RolesService,
  ) { }

  ngOnInit() { }

  ionViewWillEnter() {
    this.getData();
  }

  async getData() {
    await this.loadPermissionsList();
    await this.loadRolesList();
  }

  async loadPermissionsList() {
    // lista simples para montar filtros no modal de perfil
    let data = await this.permissionsService.getPermissions(`
      _id key description
    `);
    this.permissions = data || [];
  }

  async loadRolesList() {
    let data = await this.rolesService.getRoles(`
      _id label description _permissions
    `);
    this.roles = data || [];
  }

  // =========================
  // CRUD PERMISSIONS
  // =========================
  handlePermissionsTable(ev) {
    let map = {
      edit: () => {
        this.modalPermission.present();
        setTimeout(() => {
          this.PermissionForm.form.patchValue(ev.data);
        }, 400);
      },
      new: () => {
        this.modalPermission.present();
      },
      del: async () => {
        let confirm = await this.alertsService.confirmDel();
        if (!confirm) return;

        this.permissionsService.delPermission(ev.data)
          .then(data => {
            if (data?.status != 'success')
              return this.alertsService.notify({ type: "error", subtitle: this.i18n.lang.PERMISSION_NOT_REMOVED });

            this.clearPermission();
            return this.alertsService.notify({ type: "success", subtitle: this.i18n.lang.PERMISSION_REMOVED_SUCCESS });
          });
      },
    }

    return map[ev.action](ev.data);
  }

  savePermissionForm() {
    this.loadingService.show();
    let obj = Object.assign({}, this.PermissionForm.value);

    // padronização mínima de chave
    if (obj?.key) obj.key = String(obj.key).trim();

    this.permissionsService.savePermission(obj)
      .then(async data => {
        this.loadingService.hide();
        if (data?.status != 'success')
          return this.alertsService.notify({ type: "error", subtitle: this.i18n.lang.PERMISSION_NOT_UPDATED });

        await this.loadPermissionsList();
        this.clearPermission();
        return this.alertsService.notify({ type: "success", subtitle: this.i18n.lang.PERMISSION_UPDATED_SUCCESS });
      });
  }

  clearPermission() {
    this.PermissionForm?.form.reset();
    this.modalPermission.dismiss();
    this.reloadTablePermissions.next(true);
  }

  // =========================
  // CRUD ROLES (PROFILES)
  // =========================
  handleRolesTable(ev) {
    let map = {
      edit: () => {
        this.modalRole.present();
        setTimeout(() => {
          this.RoleForm.form.patchValue(ev.data);
        }, 400);
      },
      permissions: () => this.openRolePermissions(ev.data),
      new: () => {
        this.role = null;
        this.role_permissions = [];
        this.filt_permissions = (this.permissions || []);
        this.modalRole.present();
      },
      del: async () => {
        let confirm = await this.alertsService.confirmDel();
        if (!confirm) return;

        this.rolesService.delRole(ev.data)
          .then(data => {
            if (data?.status != 'success')
              return this.alertsService.notify({ type: "error", subtitle: this.i18n.lang.ROLE_NOT_REMOVED });

            this.clearRole();
            return this.alertsService.notify({ type: "success", subtitle: this.i18n.lang.ROLE_REMOVED_SUCCESS });
          });
      },
    }

    return map[ev.action](ev.data);
  }

  async openRolePermissions(obj?: any) {
    this.role = obj || {};
    this.role_permissions = [];
    this.filt_permissions = [];

    // carrega perfil completo (com permissões)
    let info = await this.rolesService.getRoleById(obj?._id, `
      _id
      label
      description
      _permissions
    `);

    this.modalRole.present();
    setTimeout(() => {
      let mapPerm = {};
      for (let p of (info?._permissions || []))
        mapPerm[p] = 1;

      this.role_permissions = Object.keys(mapPerm || {});
      this.filt_permissions = (this.permissions || []).filter(it => !mapPerm[it.key]);

      this.RoleForm.form.patchValue({
        _id: info?._id,
        label: info?.label,
        description: info?.description,
      });
    }, 400);
  }

  saveRoleForm() {
    this.loadingService.show();
    let obj = Object.assign({}, this.RoleForm.value);

    // mantém no payload a lista de permissões atribuídas
    obj._permissions = (this.role_permissions || []);

    this.rolesService.saveRole(obj)
      .then(async data => {
        this.loadingService.hide();
        if (data?.status != 'success')
          return this.alertsService.notify({ type: "error", subtitle: this.i18n.lang.ROLE_NOT_UPDATED });

        await this.loadRolesList();
        this.clearRole();
        return this.alertsService.notify({ type: "success", subtitle: this.i18n.lang.ROLE_UPDATED_SUCCESS });
      });
  }

  addPermissionToRoleByKey(key: string) {
    if (!key) return;

    // adiciona na lista local (sem depender de pipe)
    let exists = (this.role_permissions || []).find(p => p == key);
    if (exists) return;

    this.role_permissions = [...(this.role_permissions || []), key];

    // atualiza filtro (remove do select)
    this.filt_permissions = (this.filt_permissions || []).filter(it => it.key != key);
  }

  async rmRolePermission(key: string) {
    let confirm = await this.alertsService.confirmDel();
    if (!confirm) return;

    this.role_permissions = (this.role_permissions || []).filter(p => p != key);

    // reinclui no select se existir na base
    let perm = (this.permissions || []).find(p => p.key == key);
    if (perm) this.filt_permissions = [...(this.filt_permissions || []), perm];
  }

  clearRole() {
    this.RoleForm?.form.reset();
    this.role = null;
    this.role_permissions = [];
    this.filt_permissions = [];
    this.modalRole.dismiss();
    this.reloadTableRoles.next(true);
  }

  // =========================
  // UI HELPERS
  // =========================
  setTab(ev) {
    this.tab = ev || 'permissions';
  }
}
