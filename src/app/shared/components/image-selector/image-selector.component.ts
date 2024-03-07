import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ImageService } from './image.service';
import { Observable } from 'rxjs';
import { BlogImage } from '../../models/blog-image.model';

@Component({
  selector: 'app-image-selector',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './image-selector.component.html',
  styleUrl: './image-selector.component.css'
})
export class ImageSelectorComponent implements OnInit{

  private file? : File;

  fileName : string = '';
  title : string = '';

  @ViewChild('form',{static:false}) imageUploadForm? : NgForm;

  images$? : Observable<BlogImage[]>;

  constructor(private imageService : ImageService){}

  ngOnInit(): void {
    this.getImages();
  }

  onFileUploadChange(event : Event) : void{
    const element = event.currentTarget as HTMLInputElement;
    this.file = element.files?.[0];
  }

  uploadImage() : void{
    if(this.file && this.fileName !=='' && this.title !== ''){
      this.imageService.uploadImage(this.file,this.fileName,this.title)
      .subscribe({
        next:(res)=>{
          //console.log(res);
          this.imageUploadForm?.resetForm();
          this.getImages();
        }
      });
    }
  }

  private getImages(){
    this.images$ = this.imageService.getAllImages();
  }

  onImageClick(image :BlogImage) : void{
    this.imageService.selectImage(image);
  }
}
