export interface Post {
  _id: string;
  nameId: string;
  blogId: string;
  content: string;
  author: string;
  likes?: number;
  shares?: number;
  comments?: number;
  hidden?: boolean;
}
