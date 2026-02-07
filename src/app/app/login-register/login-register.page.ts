import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
import { UserService } from 'src/app/_shared/providers/user.service';
import { I18nService } from 'src/app/_shared/services/i18n.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { LoadingService } from 'src/app/_shared/services/loading.service';

import * as md5 from 'md5';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.page.html',
  styleUrls: ['./login-register.page.scss'],
})
export class LoginRegisterPage implements OnInit {
  @ViewChild("RegisterForm") RegisterForm: any;
  loading: any;
  production: any = environment.production;
  show_password: boolean = false;
  extras: any;

  constructor(
    public nav: NavController,
    private router: Router,
    public loadingService: LoadingService,
    public userService: UserService,
    public i18n: I18nService
  ) {
    this.loadingService.show();
    this.extras = this.router.getCurrentNavigation()?.extras.state;
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    console.log(this.extras);

    setTimeout(() => {
      if (this.extras?.name) {
        let split = this.extras.name.split(' ');
        this.extras.short_name = [split[0], split.splice(-1)[0]].join(' ')
      }

      this.RegisterForm?.form.patchValue(Object.assign({}, this.extras || {}));
      this.loadingService.hide();
    }, 400);
  }

  shortName() {
    let obj = Object.assign({}, this.RegisterForm.value);

    let split = obj.name.split(' ');
    let short_name = [split[0], split.slice(-1)[0]].join(' ');
    this.RegisterForm.form.patchValue({ short_name: short_name });
  }

  register() {
    let obj = Object.assign({}, this.RegisterForm.value);

    if (obj.password)
      obj.password = md5(obj.password);

    this.userService.register(obj)
      .then(done => {
        if (done?._id) {
          this.userService.signIn({ username: obj.email, password: this.RegisterForm.value.password });
          this.RegisterForm.form.reset();
        }
      });
  }
}
