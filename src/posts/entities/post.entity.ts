import { Post } from 'generated/prisma';

export class PostEntity implements Post {
  id: number;
  published: boolean;
  title: string;
  content: string | null;
  createdAt: Date;
  updatedAt: Date;
  authorId: number | null;
}
