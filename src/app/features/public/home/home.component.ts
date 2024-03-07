import { Component, OnInit } from '@angular/core';
import { BlogpostService } from '../../blogpost/services/blogpost.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Blogpost } from '../../blogpost/models/blogpost.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  blogs$?:Observable<Blogpost[]>;

  constructor(private blogpostService : BlogpostService){}

  ngOnInit(): void {
    this.blogs$ = this.blogpostService.getAllBlogposts();
  }

}
