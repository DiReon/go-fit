import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Lecture } from 'src/app/shared/models/lecture';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit, OnDestroy {
  articles: Lecture[];
  subscription: Subscription;
  constructor(
      private sharedService: SharedService,
    ) { 
      this.subscription = this.sharedService.getAll('articles').subscribe(a => this.articles = a);
    };

    ngOnInit(): void {
    }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
