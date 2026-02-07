import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
import { LocalStorageService } from 'src/app/_shared/services/local-storage.service';
import { I18nService } from 'src/app/_shared/services/i18n.service';
import { environment } from 'src/environments/environment';
import { UserService } from 'src/app/_shared/providers/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login-auth',
  templateUrl: './login-auth.page.html',
  styleUrls: ['./login-auth.page.scss'],
})
export class LoginAuthPage implements OnInit {
  @ViewChild("LoginForm") LoginForm: any;
  loading: any;
  production: any = environment.production;
  show_password: boolean = false;

  _institution: any;
  institution: any = {
    img:"/assets/imgs/logo-vert.png"
  };

  constructor(
    public route: ActivatedRoute,
    public nav: NavController,
    public userService: UserService,
    public i18n: I18nService
  ) {
    this.route.params.subscribe((params: any) => {
      this._institution = params?.id;
      this.getInstitution();
    })
  }

  ngOnInit() {
  }

  getInstitution() {
    if (!this._institution) return;

    this.institution = {
    img: "/assets/imgs/smilinguido.png",
    }
  }

  ionViewWillEnter() {
    this.userService.clearData();
  }

  login() {
    let obj = Object.assign({}, this.LoginForm.value);

    // TODO: remover
    // return this.nav.navigateForward('/internal');
    this.userService.signIn(obj)
      .then(done => {
        if (done) this.LoginForm.form.reset();
      });
  }

  chkSubmit(ev) {
    if (ev?.keyCode == 13)
      this.login();
  }

}
