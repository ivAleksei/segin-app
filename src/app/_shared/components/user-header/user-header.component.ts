import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';
import { I18nService } from '../../services/i18n.service';

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.scss'],
})
export class UserHeaderComponent implements OnInit {
  person: any = {
    name: "Stefano",
    avatar: `https://dummyimage.com/72x72/000/ffffff?text=ST`
  }
  constructor(
    public i18n:I18nService,
    public storage: LocalStorageService
  ) { }

  async ngOnInit() {
    let user = await this.storage.get('user');
  }
}
