import {ForumComments} from "./forum-comments";

export class Post {

  postId!: number;
  title!: string;
  description!: string;
  mediaContent! : string;

  date!: Date;
  comments?: ForumComments[];
}
