import { Component, OnInit, Inject, Input, Output, EventEmitter } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Training } from '../../models/training';

@Component({
  selector: 'upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.css']
})
export class UploadFilesComponent implements OnInit {
  @Input("training") training: Training;
  @Input() urls: string[];
  @Input() type: string;
  @Output() upload = new EventEmitter<string[]>();
  @Output() uploadIsValid = new EventEmitter<boolean>();
  uploadCompleted = false;
  subscription: Subscription;
  selectedImage: any = null;
  constructor(
    @Inject(AngularFireStorage) 
    private storage: AngularFireStorage,
  ) {}

  ngOnInit(): void {}
  
  uploadFile(event) {
    this.uploadIsValid.emit(false);
    console.log("Emit false")
    console.table(this.training);
    const files = event.target.files;
    let filePath = '/'
    for (const file of files) {
      let time = new Date().getTime();
      switch (this.type) {
        case 'training':
          filePath = `/trainings/${this.training.category}/${this.training.title}/thumbnail/${file.name}`;
          break;
        case 'lecture':
          filePath = `/lectures/${time}_${file.name}`
          break;
        case 'recipe':
          filePath = `/recipes/${time}_${file.name}`
          break;
        case 'meditation':
          filePath = `/meditation/${time}_${file.name}`
          break;
        case 'motivation':
          filePath = `/motivation/${time}_${file.name}`
          break;
        case 'articles':
          filePath = `/articles/${time}_${file.name}`
          break;
      }
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, file);

      console.log("Trying to upload file");
      task.snapshotChanges().pipe(
        finalize(() => this.subscription = fileRef.getDownloadURL().subscribe( u => {
          if(u) {
            this.urls ? this.urls.push(u) : this.urls = [u];
            this.upload.emit(this.urls);
            this.uploadIsValid.emit(true);
            console.log("Emit true")
            this.uploadCompleted = true;
          }
        }
        ))
      )
        .subscribe()
    }
  }

  deleteFile(url) {
    if (!confirm('Точно хотите удалить файл?')) return;
    this.urls.splice(this.urls.indexOf(url), 1);
    this.upload.emit(this.urls);
    this.storage.storage.refFromURL(url).delete();
  }

  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
  }

}
