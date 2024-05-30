import { Component } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Diplom-Front';

  constructor(private translate: TranslateService) {
    translate.addLangs(['ru', 'kz']);
    translate.setDefaultLang('ru');

    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/ru|kz/) ? browserLang : 'ru');
  }

  switchLanguage(language: string) {
    this.translate.use(language);
  }
}
