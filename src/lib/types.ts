export interface Post {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  excerpt?: string;
  mainImage?: {
    asset: {
      url: string;
    };
    alt?: string;
  };
  author?: {
    name: string;
    image?: {
      asset: {
        url: string;
      };
    };
  };
  publishedAt: string;
  categories?: Category[];
  body?: unknown; // PortableText content
}

export interface Author {
  _id: string;
  name: string;
  image?: {
    asset: {
      url: string;
    };
  };
  bio?: unknown; // PortableText content
  posts?: Post[];
}

export interface Category {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  posts?: Post[];
} 