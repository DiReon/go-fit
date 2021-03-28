import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.css']
})
export class ArticleFormComponent implements OnInit {
  article ={} as {
    title: string;
    description: string;
    thumbnailUrl: string;
    key: string;
  };
  articleId: string;
  uploadIsValid = true;
  urls = [];
  constructor(
    private sharedService: SharedService,
    private route: ActivatedRoute,
    private router: Router
  ) {
      this.articleId = this.route.snapshot.paramMap.get('id');
      if (this.articleId) this.sharedService.get('articles', this.articleId).valueChanges().pipe(take(1))
        .subscribe(t => {
          this.article = t;
          this.urls.push(this.article.thumbnailUrl);
        });
    }

  ngOnInit(): void {}

  onUploadFile(urls) {
    this.article.thumbnailUrl = urls[0];
  }

  uploadValidTrigger(value: boolean) {
    this.uploadIsValid = value;
  }

  save(value) {
    
    this.article.title = value.title;
    this.article.description = value.description;

    if (this.articleId) this.sharedService.update('articles', this.articleId, this.article)
    else this.sharedService.create('articles', this.article);

    this.router.navigate(['/admin/articles']);
  }
  
  delete() {
    if (!confirm('Точно хотите удалить статью?')) return;
    
    this.sharedService.delete('articles', this.articleId);
    this.router.navigate(['/admin/articles']);
    
  }

}
