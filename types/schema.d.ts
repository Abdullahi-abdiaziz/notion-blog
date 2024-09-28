export type Tag = {
  color: string;
  id: string;
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
};

export type PostPage = {
  post: BlogPost;
  markdown: string;
};
