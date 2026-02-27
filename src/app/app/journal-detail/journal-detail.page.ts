import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { AlertsService } from 'src/app/_shared/services/alerts.service';
import { LoadingService } from 'src/app/_shared/services/loading.service';
import { UtilsService } from 'src/app/_shared/services/utils.service';
import { environment } from 'src/environments/environment';
import { I18nService } from 'src/app/_shared/services/i18n.service';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { JournalsService } from 'src/app/_shared/providers/journals.service';

@Component({
  selector: 'app-journal-details',
  templateUrl: './journal-detail.page.html',
  styleUrls: ['./journal-detail.page.scss'],
})
export class JournalDetailPage implements OnInit {
 
   _id: any;
 
   journal: any;
 
 
   constructor(
     public nav: NavController,
     public journalsService: JournalsService,
     public i18n: I18nService,
     private route: ActivatedRoute,
   ) {
     this.route.params.subscribe((params: any) => {
       this._id = params?.id || null;
     })
   }
 
   ngOnInit() {
 
   }
 
   ionViewWillEnter() {
     this.getData();
   }
 
   getData() {
     this.getJournal()
   }
 
   async getJournal() {
     let data = await this.journalsService.getJournalById(this._id);
     this.journal = data || null;
   }
 }
 