import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tinymce-upload',
  templateUrl: './tinymce-upload.component.html',
  styleUrls: ['./tinymce-upload.component.sass'],
})
export class TinymceUploadComponent implements OnInit {
  constructor() {}

  textCount:number = 2;

  public tinyMCEConfig: any = {
    skin: 'oxide-dark',
    statusbar: false,
    plugins: 'lists link image table code help wordcount',
    automatic_uploads: true
    // images_upload_url: 'postAcceptor.php',
    // images_upload_base_path: '/some/basepath'
  };

  ngOnInit(): void {}
}
