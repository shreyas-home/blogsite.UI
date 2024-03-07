import { Component, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AddCategoryRequestModel } from '../models/add-category-request.model';
import { CategoryService } from '../services/category.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent implements OnDestroy{

  model : AddCategoryRequestModel;
  private addcategorySubscription? : Subscription;

  constructor(private categoryService : CategoryService , private router : Router){
    this.model={
      name:'',
      urlHandle:''
    };
  }
  

  onFormSubmit(){
    this.addcategorySubscription =  this.categoryService.addCategory(this.model)
      .subscribe({
        next : (res)=>{
          this.router.navigateByUrl('/admin/categories');
        }
      });
  }

  ngOnDestroy(): void {
    this.addcategorySubscription?.unsubscribe();
  }

}
