import { PrismaClientKnownRequestError } from 'generated/prisma/runtime/library';

export interface PrismaClientError extends PrismaClientKnownRequestError {
  meta?: Record<string, { target: string }>;
}
