import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../models/post';
import {ForumComments} from "../models/forum-comments";

@Injectable({
  providedIn: 'root'
})
export class CrudPostService {
  readonly API_URL = 'http://localhost:8082';

  constructor(private httpClient: HttpClient) { }

  getAllPosts(): Observable<Post[]> {
    return this.httpClient.get<Post[]>(`${this.API_URL}/all-posts`);
  }

  addPost(post: any): Observable<Post> {
    return this.httpClient.post<Post>(`${this.API_URL}/add-post`, post);
  }
  addComment(comment: any): Observable<ForumComments> {
    return this.httpClient.post<ForumComments>(`${this.API_URL}/add-comment`, comment);
  }

  updatePost(post: Post): Observable<Post> {
    return this.httpClient.put<Post>(`${this.API_URL}/edit-post`, post);
  }

  deletePost(postId: any): Observable<void> {
    return this.httpClient.delete<void>(`${this.API_URL}/delete-post/${postId}`);
  }

  getPostComments(postId: number): Observable<ForumComments> {
    return this.httpClient.get<ForumComments>(`${this.API_URL}/posts/${postId}/comments`);
  }
  getPostById(postId: number) {
    return this.httpClient.get<Post>(`${this.API_URL}/posts/${postId}`);
  }

}
