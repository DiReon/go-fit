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
  @Input() url: string;
  @Output() upload = new EventEmitter<string>();
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
    const file = event.target.files[0];
    let filePath = '/'
    if (this.training) {
      filePath = `/trainings/${this.training.category}/${this.training.title}/thumbnail/${file.name}`;
    } else {
      let time = new Date().getTime();
      filePath = `/recipes/${time}_${file.name}`
    }
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    console.log("Trying to upload file");
    task.snapshotChanges().pipe(
      finalize(() => this.subscription = fileRef.getDownloadURL().subscribe( u => {
        if(u) {
          this.url = u;
          this.upload.emit(this.url);
          this.uploadIsValid.emit(true);
          console.log("Emit true")
          this.uploadCompleted = true;
        }
      }
      ))
    )
      .subscribe()
  }

  deleteFile(url) {
    if (!confirm('Точно хотите удалить файл?')) return;
    this.url = null;
    this.upload.emit(this.url);
    this.storage.storage.refFromURL(url).delete();
  }

  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
  }

}
