import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { Blogpost } from '../models/blogpost.model';
import { BlogpostService } from '../services/blogpost.service';

@Component({
  selector: 'app-blogpost-list',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './blogpost-list.component.html',
  styleUrl: './blogpost-list.component.css'
})
export class BlogpostListComponent implements OnInit {
  
  blogposts$? : Observable<Blogpost[]>;

  constructor(private blogpostService : BlogpostService){}

  ngOnInit(): void {
   this.blogposts$= this.blogpostService.getAllBlogposts();
  }

}
