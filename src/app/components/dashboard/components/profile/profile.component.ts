import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public data: any;
  constructor(
    private storageService: StorageService
  ) { }

  ngOnInit() {
    this.data = this.storageService.getData('token');
  }

}
