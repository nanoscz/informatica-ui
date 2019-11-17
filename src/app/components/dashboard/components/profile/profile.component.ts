import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { StorageService } from 'src/app/services/storage.service';
import { UploadComponent } from '../../shared/upload/upload.component';
import { ImageService } from '../../../../services/image.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public data: any;
  constructor(
    private storageService: StorageService,
    private imageService: ImageService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.data = this.storageService.getData('token');
    this.imageService.findOne(this.data.id)
      .then(async data => {
        if (data ===  null) {
          const response = await this.imageService.register({ userId: this.data.id, image: 'user.png' });
          this.data.image = response.image;
        } else {
          this.data.image = data.image;
        }
      })
      .catch(err => console.error(err));
  }

  toUpload() {
    const dialogRef = this.dialog.open(UploadComponent, {
      width: '400px',
      data: this.data
    });

    dialogRef.afterClosed().subscribe(data => {
      // this.data.image =
      console.log('The dialog was closed', data);
    });
  }
}
