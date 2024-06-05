import { Component } from '@angular/core';
import {NewsService} from "../services/news/news.service";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrl: './news.component.css'
})
export class NewsComponent {
  newsList: any[] = [];

  constructor(private newsService: NewsService) { }

  ngOnInit(): void {
    this.newsService.getAllNews().subscribe(data => {
      this.newsList = data;
      console.log(data);
    });

  }
}
