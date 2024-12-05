export type Tag = {
  name: string;
};

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  cover: string;
  tags: Tag[];
  date: string;
  description: string;
  author: string;
};

export type PostPage = {
  post: BlogPost;
  markdown: string;
};
