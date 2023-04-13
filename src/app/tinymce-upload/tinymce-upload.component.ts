import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-tinymce-upload',
  templateUrl: './tinymce-upload.component.html',
  styleUrls: ['./tinymce-upload.component.sass'],
})
export class TinymceUploadComponent implements OnInit {

  private readonly apiKey = 'a6hn04bkrvo3u2fwoh0gmq81778e9ywanm3qjwhfkriasfsq';
  @ViewChild('tinyEditor')
  tinyEditor: any;

  constructor(private elRef: ElementRef, private renderer: Renderer2) {}

  textCount: number = 2;

  //TinyMCE API Key: 
  public tinyMCEConfig: any = {
    skin: 'oxide-dark',
    statusbar: false,
    plugins: 'save lists link image table code help wordcount',
    toolbar: 'save',
    save_oncancelcallback: () => {
      console.log('Save canceled');
    },
    automatic_uploads: true,
    images_file_types: 'jpg,png',
    images_upload_url: 'http://localhost:8080/upload',
    block_unsupported_drop: true,
    // images_upload_base_path: 'http://localhost:8080',
    setup: (editor:any) => {
      editor.on('init', (e:any) => {
        console.log('The Editor has initialized.');
      });
    }
  };

  ngOnInit(): void {}

  onCheckContent (){
    console.log('check content',this.tinyEditor)
    // console.log(this.tinyEditor.getContent())
    console.log(this.tinyEditor.getBody().innerText)
    console.log(this.tinyEditor.getContent())
    // this.tinyEditor.save();
  }
  

  // loadTinyMceScript() {
  //   const script = this.renderer.createElement('script');
  //   script.src = `https://cdn.tiny.cloud/1/${this.apiKey}/tinymce/5/tinymce.min.js`;
  //   script.type = 'text/javascript';
  //   script.referrerpolicy = 'origin';
  //   script.onload = () => {
  //     this.initializeTinyMce();
  //   };
  //   this.renderer.appendChild(
  //     this.elRef.nativeElement.ownerDocument.head,
  //     script
  //   );
  // }

  // initializeTinyMce() {
  //   tinymce.init({
  //     selector: '#mytextarea',
  //     plugins: 'code',
  //     toolbar:
  //       'undo redo | formatselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | code',
  //   });
  // }
}
