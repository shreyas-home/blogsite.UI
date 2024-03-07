import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BlogpostService } from '../../blogpost/services/blogpost.service';
import { Observable } from 'rxjs';
import { Blogpost } from '../../blogpost/models/blogpost.model';
import { MarkdownModule } from 'ngx-markdown';

@Component({
  selector: 'app-blog-details',
  standalone: true,
  imports: [CommonModule,RouterModule,MarkdownModule],
  templateUrl: './blog-details.component.html',
  styleUrl: './blog-details.component.css'
})
export class BlogDetailsComponent implements OnInit {

  url : string | null = null;
  blogpost$? : Observable<Blogpost>;
  
  constructor(private route : ActivatedRoute , private blogpostService : BlogpostService){}
  
  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next : (params) =>{
        this.url = params.get('url');
      }
    });

    if(this.url){
      this.blogpost$ = this.blogpostService.getBlogpostByUrlHandle(this.url);
    }
    
  }

}
