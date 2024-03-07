import { Injectable } from '@angular/core';
import { AddBlogpost } from '../models/add-blogpost.model';
import { Observable } from 'rxjs';
import { Blogpost } from '../models/blogpost.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { UpdateBlogpost } from '../models/update-blogpost.model';

@Injectable({
  providedIn: 'root'
})
export class BlogpostService {

  constructor(private http : HttpClient) { }

  createBlogpost(addBlogPostModel : AddBlogpost) : Observable<Blogpost>{
    return this.http.post<Blogpost>(`${environment.apiBaseUrl}/api/blogposts`,addBlogPostModel);
  }

  getAllBlogposts() : Observable<Blogpost[]>{
    return this.http.get<Blogpost[]>(`${environment.apiBaseUrl}/api/blogposts`);
  }

  getBlogpostById(id:string) : Observable<Blogpost>{
    return this.http.get<Blogpost>(`${environment.apiBaseUrl}/api/blogposts/${id}`);
  }

  getBlogpostByUrlHandle(urlHandle:string) : Observable<Blogpost>{
    return this.http.get<Blogpost>(`${environment.apiBaseUrl}/api/blogposts/${urlHandle}`);
  }

  updateBlogpost(id:string,updatedBlogpost:UpdateBlogpost) : Observable<Blogpost>{
    return this.http.put<Blogpost>(`${environment.apiBaseUrl}/api/blogposts/${id}`,updatedBlogpost);
  }

  deleteBlogpost(id:string) : Observable<Blogpost>{
    return this.http.delete<Blogpost>(`${environment.apiBaseUrl}/api/blogposts/${id}`);
  }
}
