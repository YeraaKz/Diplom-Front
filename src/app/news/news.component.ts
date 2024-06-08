import { Component } from '@angular/core';
import {NewsService} from "../services/news/news.service";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrl: './news.component.css'
})
export class NewsComponent {
  newsList: any[] = [];
  isLoading: boolean = false;

  constructor(private newsService: NewsService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.newsService.getAllNews().subscribe(data => {
      this.newsList = data;
      console.log(data);
      this.isLoading = false;
    });

  }
}
