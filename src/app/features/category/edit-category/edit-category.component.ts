import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UpdateCategoryRequest } from '../models/update-category-request.model';

@Component({
  selector: 'app-edit-category',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './edit-category.component.html',
  styleUrl: './edit-category.component.css'
})
export class EditCategoryComponent implements OnInit,OnDestroy{
 
  id : string | null = null;
  paramSubsription? : Subscription;
  updateSubsription? : Subscription;

  category? : Category;

  constructor(private route : ActivatedRoute,private categoryService : CategoryService,
              private router : Router){}
  
 
  ngOnInit(): void {
    this.paramSubsription = this.route.paramMap.subscribe({
      next:(params)=>{
        this.id = params.get('id');

        if(this.id){
          //Get data From API based on Id
          this.categoryService.getCategoryById(this.id)
          .subscribe({
            next : (res)=>{
              this.category=res;
            }
          });
        }
      }
    });
  }

  onFormSubmit():void{
    const updateCategoryRequest : UpdateCategoryRequest={
      name : this.category?.name ?? '',
      urlHandle : this.category?.urlHandle ?? '',
    };

    if(this.id){
      this.updateSubsription = this.categoryService.updateCategory(this.id,updateCategoryRequest)
      .subscribe({
        next : (res)=>{
          this.router.navigateByUrl('/admin/categories');
        }
      });
    }
  }

  onDelete(): void{
    if(this.id){
      this.categoryService.deleteCategory(this.id)
      .subscribe({
        next : (res)=>{
          this.router.navigateByUrl('/admin/categories');
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.paramSubsription?.unsubscribe();
    this.updateSubsription?.unsubscribe();
  }

}
