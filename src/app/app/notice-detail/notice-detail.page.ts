import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { NoticesService } from 'src/app/_shared/providers/notices.service';
import { I18nService } from 'src/app/_shared/services/i18n.service';

@Component({
  selector: 'app-notice-detail',
  templateUrl: './notice-detail.page.html',
  styleUrls: ['./notice-detail.page.scss'],
})
export class NoticeDetailPage implements OnInit {

  _id: any;
  notice: any;

  constructor(
    public nav: NavController,
    public i18n: I18nService,
    private route: ActivatedRoute,
    private noticesService: NoticesService
  ) {
    this.route.params.subscribe((params: any) => {
      this._id = params?.id || null;
      this.getNotice();
    })
  }

  ngOnInit() {
  }

  async getNotice() {
    let data = await this.noticesService.getNoticeById(this._id);
    this.notice = data || null;
  }
}
