import { User } from 'generated/prisma';

export class UserEntity implements User {
  name: string;
  id: number;
  email: string;
  admin: boolean;
  createdAt: Date;
}
