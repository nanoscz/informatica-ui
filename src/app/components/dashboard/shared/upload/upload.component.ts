import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UploadService } from 'src/app/services/upload.service';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  public file: File = null;
  public imageTmp: any;
  public textButton = 'Update Photo';
  constructor(
    private imageService: ImageService,
    private uploadSErvice: UploadService,
    public dialogRef: MatDialogRef<UploadComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
  ngOnInit() {
    console.log(this.data);
  }

  selectImg(file: File) {
    if (!file) {
      this.file = null;
      return;
    }
    if (file.type.indexOf('image') < 0) {
      alert('Error Load Image.');
      this.file = null;
      return;
    }
    this.file = file;
    const reader = new FileReader();
    const urlImageTemp =  reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.imageTmp = reader.result;
    };
  }

  upload() {
    if (this.file === null) {
      console.warn('Select File.');
      return;
    }
    this.uploadSErvice.upload(this.file, this.data.id)
      .then(async (data: any) => {
        const image = data.image;
        this.data.image = image;
        await this.imageService.update({image}, this.data.id).catch(err => console.error(err));
      })
      .catch(err => console.error(err));
  }
}
