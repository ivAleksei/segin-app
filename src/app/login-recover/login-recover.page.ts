import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
import { UserService } from '../_shared/providers/user.service';
import { I18nService } from '../_shared/services/i18n.service';

@Component({
  selector: 'app-login-recover',
  templateUrl: './login-recover.page.html',
  styleUrls: ['./login-recover.page.scss'],
})
export class LoginRecoverPage implements OnInit {
  @ViewChild("RecoverForm") RecoverForm: any;

  constructor(
    public nav: NavController,
    public userService: UserService,
    public i18n: I18nService
  ) { }

  ngOnInit() {
  }

  recover() {
    let obj = Object.assign({}, this.RecoverForm.value);

    console.log(obj);
    
    // this.userService.register(obj)
    //   .then(done => {
    //     if (done) this.RecoverForm.form.reset();
    //   });
  }

}
