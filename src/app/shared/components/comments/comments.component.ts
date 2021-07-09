import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { AppUser } from '../../models/app-user';
import { Meal } from '../../models/meal';
import { Training } from '../../models/training';
import { UserComment } from '../../models/user-comment';
import { SharedService } from '../../services/shared.service';
import { DialogOverviewExampleDialog } from './dialog-overview-example-dialog';


@Component({
  selector: 'comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  @Input("user") user: AppUser;
  @Input("content") content: Training | Meal;
  @Input("type") type: string;
  comments: UserComment[];
  input: FormControl;
  commentsForm = new FormGroup({
    comment: new FormControl('', [
      Validators.required
    ]),
  })
  constructor(
    private sharedService: SharedService,
    public dialog: MatDialog,
  ) {
    
  }
  
  ngOnInit(): void {
  }

  ngOnChanges() {
    if (this.content?.title) {
      this.comments = (this.content.comments) ? Object.values(this.content.comments) : [];
      console.log(this.comments);
    }
  }

  onChange() {
    console.log("Change detected: ", this.commentsForm.get('comment').value);
    
  }

  onSubmit() {
    console.table(this.commentsForm.value);
    let comment: UserComment = {
      dateCreated: new Date().getTime(),
      authorId: this.user.userId,
      authorName: this.user.name,
      text: (this.commentsForm.get('comment').value as string)
    }
    
    this.sharedService.recordComment(this.type, this.content.key, comment);    
    this.commentsForm.get('comment').setValue(' ');
    // this.router.navigate(['/admin/groups/'], {queryParams: {group: this.student.group, category: this.quiz.category}});
  }

  delete(comment:UserComment) {
    console.log(comment);
    let index = this.comments.indexOf(comment);
    this.comments.splice(index, 1);
    this.sharedService.deleteComment(this.type, this.content.key, comment.dateCreated.toString());
  }

  modify(comment:UserComment) {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '350px',
      data: comment
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      console.log(comment);
      this.sharedService.recordComment(this.type, this.content.key, comment)
    });
  }
}

