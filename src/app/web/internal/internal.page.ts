import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/_shared/providers/user.service';
import { ModalController, NavController, Platform } from '@ionic/angular';
import $ from 'jquery';
import { SocketService } from 'src/app/_shared/services/socket.service';
import { LocalStorageService } from 'src/app/_shared/services/local-storage.service';
// import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';
import { LoadingService } from 'src/app/_shared/services/loading.service';
import { environment } from 'src/environments/environment';
import { HttpService } from 'src/app/_shared/services/http.service';
import { NotificationsService } from 'src/app/_shared/providers/notifications.service';
import { NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BannersService } from 'src/app/_shared/providers/banners.service';
import moment from 'moment';
import { PersonsService } from 'src/app/_shared/providers/persons.service';
import { UtilsService } from 'src/app/_shared/services/utils.service';
import { InstitutionsService } from 'src/app/_shared/providers/institutions.service';
import { I18nService } from 'src/app/_shared/services/i18n.service';
import { PersonLinksService } from 'src/app/_shared/providers/person-links.service';

@Component({
  selector: 'app-internal',
  templateUrl: './internal.page.html',
  styleUrls: ['./internal.page.scss'],
})
export class InternalPage implements OnInit {
  @ViewChild("menuSidebar") menuSidebar: any;

  list_students: any = [];
  list_institutions: any = [];
  _institution: any;
  _student: any;
  env: any = environment;
  force_chg: any = false;
  password: any;
  confirm_password: any;
  loading: any = false;

  mobile: any = false;
  person: any = {};
  user: any = {};
  mod: any = {};

  menu: any = [];
  banners: any = [];
  notifications: any = [];
  menu_type: any = environment.menu_type;

  show_banners: any;
  modal: any;
  info_api: any;

  routerSub: Subscription;

  constructor(
    public i18n: I18nService,
    private http: HttpService,
    private modalCtrl: ModalController,
    private bannersService: BannersService,
    private storage: LocalStorageService,
    private socket: SocketService,
    private nav: NavController,
    private platform: Platform,
    private institutionsService: InstitutionsService,
    private personLinksService: PersonLinksService,
    private personsService: PersonsService,
    private userService: UserService,
    private loadingService: LoadingService,
    // private screenOrientation: ScreenOrientation,
    public router: Router,
    public notificationsService: NotificationsService
  ) {
    this.notificationsService.watch.subscribe(ev => {
      this.getNotifications();
    })
    this.userService.watch.subscribe(ev => {
      this.setupMenu();
    })
    this.routerSub = router.events.pipe().subscribe((e: any) => {
      if (e instanceof NavigationStart) {
        this.checkPermission(e.url)
        this.closeMenus();
      }
    });

    this.typeMenu();
  }

  async ionViewWillEnter() {
    this.getData();
  }

  async checkPermission(route) {
    if (!environment.production || !route.startsWith('/internal')) return;

    let find = (this.menu || []).find(m => {
      if (m.route && route.startsWith(m.route)) return m;
      return (m.submenu || []).find(p => {
        if (p.route && route.startsWith(p.route)) return p;
      })
    });

    if (!find)
      return this.userService.logOut();
  }

  closeMenus() {
    // MINIMIZE SIDEBAR
    this.mod = {};
    for (let it of this.menu)
      it.open = false;

    if (this.menuSidebar)
      this.menuSidebar.close();

    $('.header-submenu').removeClass('in');
    $('.notifications-menu').removeClass('in');
    $('.top-menu').removeClass('in');
  }

  typeMenu() {
    this.menu_type = innerWidth <= 768 ? environment.menu_type : "desktop";
    window.addEventListener('resize', () => {
      this.menu_type = innerWidth <= 768 ? environment.menu_type : "desktop";
    })
  }

  ngOnInit() {
    let env = environment.production ? 'production' : 'development';
    this.socket.start(env);
    // this.screenOrientation.onChange().subscribe(() => this.closeMenus());
  }

  ngOnDestroy() {
    if (!this.routerSub?.closed)
      this.routerSub.unsubscribe();
  }



  ionViewDidEnter() {
    this.menuSidebar?.ionDidClose.subscribe(ev => {
      this.closeMenus();
    });

    this.checkChangePassword();
  }


  async getData() {
    this.getEnvironmentAPI();
    await this.getUser();

    this.setupMenu();
    this.getNotifications();
    this.getRelateds();
    this.getInstitutions();
    this.getBanners();
    this.preloadData();
  }

  // CARREGA DADOS EM SEGUNDO PLANO
  async preloadData() {
  }


  async getRelateds() {
    let person = await this.storage.get('person');
    if(!person) return;
    
    let data = await this.personLinksService.getStudentsByGuardian({_guardian: person._id }, `
      student{
        _id
        name
      }
    `)
    this.list_students = (data || []).sort((a, b) => b.name > a.name ? 1 : -1);
  }

  async getInstitutions() {
    let data = await this.institutionsService.getInstitutions({}, `
      name
    `)
    this.list_institutions = (data || []).sort((a, b) => b.name > a.name ? 1 : -1);
  }

  setInstitution() {
    this.storage.set('__institution', this._institution);
    location.reload();
  }

  async getBanners() {
    let last_see_banners = await this.storage.get('last_see_banners');
    if (last_see_banners && moment().isSame(moment(last_see_banners), 'day')) return;

    let banners = await this.bannersService.getBanners()
    this.banners = (banners || []).sort((a, b) => b.tipo > a.tipo ? 1 : -1);

    if (this.banners?.length)
      this.show_banners = true;
  }

  setSeeBanners() {
    this.show_banners = false;
    this.storage.set('last_see_banners', moment().format())
  }


  async checkChangePassword() {
    let chg_password = await this.storage.get('_change_password');
    let tmp_pass = await this.storage.get('tmp_pass');

    if (chg_password || tmp_pass) {
      this.force_chg = true;
      this.openModalPassword();
    }
  }

  async getUser() {
    let user = await this.userService.getUser();
    if (!user) return this.userService.logOut();

    if (user && !user.img) user.img = '/assets/imgs/avatar.jpeg';
    this.user = user || {};

    let _institution = await this.storage.get('__institution');
    this._institution = _institution || null;
  }

  async getNotifications() {
    let notifications = await this.notificationsService.getNotificationsUnread()
    this.notifications = (notifications || []);
  }

  async readAllNotifications() {
    let _user = await this.storage.get('user_id');
    await this.loadingService.show();
    // await this.notificationsService.setReadAll({ _person: _user });
    this.getNotifications();
    await this.loadingService.hide();
  }

  routeNotifications() {
    this.nav.navigateForward("/internal/notifications");
    $('.notifications-menu').removeClass('in');
  }

  side_mode: boolean = false;

  async setupMenu() {
    this.person = await this.storage.get('person');
    if (!this.person?.img) {
      let split = (this.person?.short_name || "").split(' ');
      if (split?.length > 1) {
        let inicials = [split[0][0], split[1][0]];
        this.person.img = `https://dummyimage.com/72x72/000/ffffff?text=${inicials.join('')}`;
      }
    }
    let user = await this.storage.get('user');

    if (user?.menu?.length > 13)
      this.side_mode = true;

    this.menu = (user?.menu || []);
  }

  toggleMenu(it, ev?) {
    if (!it.submenu) {
      this.routeMenu(it);
    } else {
      it.open = !it.open;
      for (let m of this.menu)
        m.open = m._id == it._id && it.open;

      if (it.open) {
        if (ev) $('.header-submenu').css({ left: ev.target.offsetLeft });
        this.mod = it;
      } else {
        this.mod = {};
      }
    }
  }

  toggleNotifications() {
    let open = $('.notifications-menu').hasClass('in');
    this.closeMenus();
    if (!open)
      $('.notifications-menu').toggleClass('in');
  }

  openNotify(not: any) {
    this.notificationsService.openNotify(not);
    this.notifications = (this.notifications || []).filter(it => it._id != not._id)
    $('.notifications-menu').removeClass('in');
  }

  toggleTopMenu() {
    let open = $('.top-menu').hasClass('in');
    this.closeMenus();
    if (!open)
      $('.top-menu').toggleClass('in');
  }


  routeMenu(pg) {
    if (!pg || pg.bo_desabilitado) return;
    this.closeMenus();
    this.nav.navigateForward(pg.route);
  }

  logout() {
    this.closeMenus();
    $('.top-menu').removeClass('in');

    this.userService.logOut();
  }

  async editProfile() {
    this.closeMenus();
    $('.top-menu').removeClass('in');
    this.nav.navigateForward(`/internal/profile/`);
  }


  // UPD PASSWORD

  modalPassword: boolean = false;

  async openModalPassword(obj?: any) {
    if (!obj) obj = {};
    $('.top-menu').removeClass('in');

    this.modalPassword = true;
  }

  async updPassword() {
    let _id = await this.storage.get('user_id');

    let payload = {
      _id: _id,
      password: this.password
    }

    this.userService.updPassword(payload)
      .then(done => {
        if (done?.str_cpf)
          this.clearUpdPassword();
      })
  }

  async clearUpdPassword() {
    this.password = null;
    this.confirm_password = null;
    this.modalPassword = false;
    this.force_chg = false;
    await this.storage.remove('_change_password');

    return;
  }

  async getEnvironmentAPI() {
    let url = [environment.API.segin, 'ws', 'env'].join('/');
    this.info_api = await this.http.get(url);
  }


  async about() {
    this.nav.navigateForward('/internal/about');
    this.closeMenus();
  }

  openUrl(url) {
    if (!url) return;

    window.open(url, '_blank');
  }
}
