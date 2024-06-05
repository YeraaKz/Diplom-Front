import { Component } from '@angular/core';
import {NewsDTO} from "../services/news/newsDTO";
import {ActivatedRoute} from "@angular/router";
import {NewsService} from "../services/news/news.service";

@Component({
  selector: 'app-news-details',
  templateUrl: './news-details.component.html',
  styleUrl: './news-details.component.css'
})
export class NewsDetailsComponent {
  news: NewsDTO | undefined;

  constructor(
    private route: ActivatedRoute,
    private newsService: NewsService
  ) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.newsService.getNewsById(id).subscribe(data => {
      this.news = data;
    });
  }
}
