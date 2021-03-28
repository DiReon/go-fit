import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Lecture } from 'src/app/shared/models/lecture';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-article-card',
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.css']
})
export class ArticleCardComponent implements OnInit, OnDestroy {
  article = {} as Lecture;
  articleId: string;
  videoId: string;
  subscription: Subscription;

  constructor(
    private sharedService: SharedService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.articleId = this.route.snapshot.paramMap.get('articleId');
    this.subscription = this.sharedService.get('articles', this.articleId).valueChanges()
      .subscribe(r => this.article = r);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
