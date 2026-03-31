import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
    public nav: NavController
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    // VERIFICA PERFIL E NAVEGA PRA HOME ESPECÍFICA 
    this.nav.navigateForward('/internal/home-guardian');
  }
}
