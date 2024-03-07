import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AddBlogpost } from '../models/add-blogpost.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BlogpostService } from '../services/blogpost.service';
import { MarkdownModule } from 'ngx-markdown';
import { CategoryService } from '../../category/services/category.service';
import { Observable, Subscription } from 'rxjs';
import { Category } from '../../category/models/category.model';
import { ImageSelectorComponent } from "../../../shared/components/image-selector/image-selector.component";
import { ImageService } from '../../../shared/components/image-selector/image.service';

@Component({
    selector: 'app-add-blogpost',
    standalone: true,
    templateUrl: './add-blogpost.component.html',
    styleUrl: './add-blogpost.component.css',
    imports: [RouterModule, CommonModule, FormsModule, MarkdownModule, ImageSelectorComponent]
})
export class AddBlogpostComponent implements OnInit,OnDestroy {

  model : AddBlogpost;
  categories$? : Observable<Category[]>;
  isImageSelectorVisible : boolean =false;

  imageSubscription? : Subscription;

  constructor(private blogpostService : BlogpostService,private router:Router
    ,private categoryService:CategoryService, private imageService : ImageService){
    this.model={
      title:'',
      shortDescription:'',
      content:'',
      urlHandle:'',
      featuredImageUrl:'',
      author:'',
      isVisible:true,
      publishedDate:new Date(),
      categories:[]
    };
  }
 

  ngOnInit(): void {
    this.categories$ = this.categoryService.getAllCategories();

    this.imageSubscription = this.imageService.onSelectImage()
    .subscribe({
      next: (res)=>{
        this.model.featuredImageUrl = res.url;
        this.isImageSelectorVisible = false;
      }
    });
  }

  onFormSubmit(){
    this.blogpostService.createBlogpost(this.model)
    .subscribe({
      next: (res)=>{
        this.router.navigateByUrl('/admin/blogposts');
      }
    });
  }

  openImageSelector(): void{
    this.isImageSelectorVisible = true;
  }

  closeImageSelector() : void{
    this.isImageSelectorVisible = false;
  }

  ngOnDestroy(): void {
    this.imageSubscription?.unsubscribe();
  }
}
