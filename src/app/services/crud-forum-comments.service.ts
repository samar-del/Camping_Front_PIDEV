import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {ForumComments} from "../models/forum-comments";
import {Post} from "../models/post";

@Injectable({
  providedIn: 'root'
})
export class CrudForumCommentsService {
  readonly API_URL = 'http://localhost:8082';

  constructor(private httpClient: HttpClient) { }

  getAllComments() {
    return this.httpClient.get(`${this.API_URL}/all-comments`);
  }

  addComment(comment: any) {
    return this.httpClient.post(`${this.API_URL}/add-comment/`, comment);
  }

  updateComment(comment: ForumComments){
    return this.httpClient.put(`${this.API_URL}/edit-comment`, comment);
  }
  deleteComment(idComment: any){
    return  this.httpClient.delete(`${this.API_URL}/delete-comment/${idComment}`);
  }

  getCommentsByPostId(postId: number) {
    return this.httpClient.get(`${this.API_URL}/comments/post/${postId}`);
  }

}

