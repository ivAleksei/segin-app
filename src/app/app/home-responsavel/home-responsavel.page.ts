import { Component, OnInit } from '@angular/core';
import { I18nService } from 'src/app/_shared/services/i18n.service';
import moment from 'moment';
import { UserService } from 'src/app/_shared/providers/user.service';
import { LocalStorageService } from 'src/app/_shared/services/local-storage.service';

@Component({
  selector: 'app-home-responsavel',
  templateUrl: './home-responsavel.page.html',
  styleUrls: ['./home-responsavel.page.scss'],
})
export class HomeResponsavelPage implements OnInit {

  date_ref: any = moment().format('YYYY-MM-DD');

  meals: any = [
    {
      name: "Café da Manhã",
      date: "2024-05-13",
      start: "07:30",
      img: {
        url: "https://www.seara.com.br/wp-content/uploads/2025/09/pizza-de-pao-de-forma-portal-minha-receita-1-1.jpg"
      },
      text: `<ul>
              <li>Leite (ou bebida vegetal) com aveia</li>
              <li>Banana amassada com canela</li>
              <li>Pão macio com queijo branco</li>
            </ul>`
    },
    {
      name: "Lanche",
      date: "2024-05-13",
      start: "09:30",
      img: {
        url: "https://www.seara.com.br/wp-content/uploads/2025/09/pizza-de-pao-de-forma-portal-minha-receita-1-1.jpg"
      },
      text: ` <ul>
              <li>Maçã em cubos</li>
              <li>Água</li>
            </ul>`
    },
    {
      name: "Café da Manhã",
      date: "2024-05-13",
      start: "11:30",
      img: {
        url: "https://www.seara.com.br/wp-content/uploads/2025/09/pizza-de-pao-de-forma-portal-minha-receita-1-1.jpg"
      },
      text: `<ul>
              <li>Arroz + feijão</li>
              <li>Frango desfiado ao molho suave</li>
              <li>Abóbora refogada</li>
              <li>Salada de pepino (opcional)</li>
            </ul>`
    }
  ];
  notices: any = [
    { title: "Feriado Municipal", subtitle: "Feriado dia 08/01/2026", text: "Informamos que as atividades escolares serão encerradas as 12h00 do dia 08/01/2026, pois será realizada uma detetização." },
    { title: "Detetização", subtitle: "Feriado dia 08/01/2026", text: "Informamos que as atividades escolares serão encerradas as 12h00 do dia 08/01/2026, pois será realizada uma detetização." },
    { title: "Passeio", subtitle: "Feriado dia 08/01/2026", text: "Informamos que as atividades escolares serão encerradas as 12h00 do dia 08/01/2026, pois será realizada uma detetização." }
  ];
  schedule: any = [
    {
      index: 0,
      date: "2024-05-13",
      start: "07:00",
      end: "08:00",
      _subject: 1,
      _person: 1,
      label: "Leitura",
      subject: {
        name: "Leitura"
      },
      person: {
        name: "Apolônia do Rodrigues"
      }
    },
    {
      index: 0,
      date: "2024-05-13",
      start: "08:00",
      end: "09:30",
      _subject: 1,
      label: "Brincadeiras",
      subject: {
        name: "Brincadeiras"
      },
      person: {
        name: "José de Pedro"
      }
    },
    {
      index: 0,
      date: "2024-05-13",
      start: "09:30",
      end: "10:30",
      _subject: 1,
      label: "Hora da Soneca",
      subject: {
        name: "Hora da Soneca"
      },
      person: {
        name: "Laércio do Rodrigues"
      }
    },
    {
      index: 0,
      date: "2024-05-13",
      start: "10:30",
      end: "12:30",
      _subject: 1,
      label: "A Disposição do CA",
      subject: {
        name: "Socializar"
      },
      person: {
        name: "José de Pedro"
      }
    }
  ];


  constructor(
    public storage: LocalStorageService,
    public userService: UserService,
    public i18n: I18nService
  ) { }

  ngOnInit() {
    this.setupPage();
  }

  ionViewWillEnter() {
    this.getData();
  }

  setupPage() {
  }

  getData() {
  }

}
