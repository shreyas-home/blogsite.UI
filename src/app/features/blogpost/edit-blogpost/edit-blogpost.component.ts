import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { BlogpostService } from '../services/blogpost.service';
import { Blogpost } from '../models/blogpost.model';
import { MarkdownModule } from 'ngx-markdown';
import { CategoryService } from '../../category/services/category.service';
import { Category } from '../../category/models/category.model';
import { UpdateBlogpost } from '../models/update-blogpost.model';
import { ImageSelectorComponent } from "../../../shared/components/image-selector/image-selector.component";
import { ImageService } from '../../../shared/components/image-selector/image.service';

@Component({
    selector: 'app-edit-blogpost',
    standalone: true,
    templateUrl: './edit-blogpost.component.html',
    styleUrl: './edit-blogpost.component.css',
    imports: [CommonModule, FormsModule, MarkdownModule, RouterModule, ImageSelectorComponent]
})
export class EditBlogpostComponent implements OnInit,OnDestroy{
  
  id : string | null = null;
   model? : Blogpost;
  categories$? : Observable<Category[]>;
  selectedCategories? : string[];
  isImageSelectorVisible : boolean =false;

  routeSubsription? : Subscription;
  updateSubsription? : Subscription;
  deleteSubsription? : Subscription;
  getBlogpostSubsription? : Subscription;
  imageSubscription? : Subscription;
  
  constructor(private route : ActivatedRoute, private blogpostService : BlogpostService,
     private categoryService : CategoryService, private router : Router, private imageService : ImageService){}
 
  
  ngOnInit(): void {

    this.categories$ = this.categoryService.getAllCategories();

   this.routeSubsription = this.route.paramMap.subscribe({
      next : (params)=>{
        this.id = params.get('id');

        if(this.id){
          this.getBlogpostSubsription = this.blogpostService.getBlogpostById(this.id)
          .subscribe({
            next : (res)=>{
              this.model=res;
              this.selectedCategories = res.categories.map(x=>x.id);
            }
          });
        }

        this.imageSubscription = this.imageService.onSelectImage()
        .subscribe({
          next: (res)=>{
            if(this.model){
              this.model.featuredImageUrl = res.url;
              this.isImageSelectorVisible = false;
            }
          }
        });
      }
    });
  }

  onFormSubmit() : void{
    // Map this.model to request model
    if(this.model && this.id){
      var updateBlogpost : UpdateBlogpost ={
        title : this.model.title,
        author : this.model.author,
        urlHandle : this.model.urlHandle,
        shortDescription : this.model.shortDescription,
        content : this.model.content,
        featuredImageUrl : this.model.featuredImageUrl,
        publishedDate : this.model.publishedDate,
        isVisible : this.model.isVisible,
        categories : this.selectedCategories ?? []
      }

      this.updateSubsription = this.blogpostService.updateBlogpost(this.id,updateBlogpost)
      .subscribe({
        next : (res)=>{
          this.router.navigateByUrl('/admin/blogposts');
        }
      });
    }
  }


  onDelete() : void{
    if(this.id){
      this.deleteSubsription = this.blogpostService.deleteBlogpost(this.id)
      .subscribe({
        next:(res)=>{
          this.router.navigateByUrl('/admin/blogposts');
        }
      });
    }
  }


  openImageSelector(): void{
    this.isImageSelectorVisible = true;
  }

  closeImageSelector() : void{
    this.isImageSelectorVisible = false;
  }

  ngOnDestroy(): void {
   this.routeSubsription?.unsubscribe();
   this.updateSubsription?.unsubscribe();
   this.getBlogpostSubsription?.unsubscribe();
   this.deleteSubsription?.unsubscribe();
   this.imageSubscription?.unsubscribe();
  }

}
