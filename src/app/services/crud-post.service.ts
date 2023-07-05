import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {Post} from '../models/post';
@Injectable({
  providedIn: 'root'
})
export class CrudPostService {

  readonly API_URL = 'http://localhost:8082';

  constructor(private httpClient: HttpClient) { }

  getAllPosts() {
    return this.httpClient.get(`${this.API_URL}/all-posts`);
  }

  addPost(post: any) {
    return this.httpClient.post(`${this.API_URL}/add-post/`, post);
  }

  updatePost(post: Post){
    return this.httpClient.put(`${this.API_URL}/edit-post`, post);
  }
  deletePost(idPost: any){
    return  this.httpClient.delete(`${this.API_URL}/delete-post/${idPost}`);
  }

}

