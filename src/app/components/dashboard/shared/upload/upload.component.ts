import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  public file: File;
  public imageTmp: any;
  public textButton = 'Update Photo';
  constructor(
    public dialogRef: MatDialogRef<UploadComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
  ngOnInit() {
  }

  selectImg(file: File) {
    if (!file) {
      this.file = null;
      return;
    }
    if (file.type.indexOf('image') < 0) {
      alert('Error');
      this.file = null;
      return;
    }
    this.file = file;
    const reader = new FileReader();
    const urlImageTemp =  reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.imageTmp = reader.result;
      console.log(this.imageTmp);
    };
  }
}
