import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../../models/post';
import { CrudPostService } from '../../services/crud-post.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent implements OnInit {
  post!: Post;
  postId!: number;

  constructor(
    private route: ActivatedRoute,
    private postService: CrudPostService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.postId = params['postId'];
      this.getPostDetails(this.postId);
    });
  }

  getPostDetails(postId: number): void {
    this.postService.getPostById(postId).subscribe(
      (post: Post) => {
        this.post = post;
      },
      (error: any) => {
        console.error('Error retrieving post details:', error);
      }
    );
  }
}
