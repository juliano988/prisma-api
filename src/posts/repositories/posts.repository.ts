import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostDto } from '../dto/create-post.dto';
import { PostEntity } from '../entities/post.entity';
import { UpdatePostDto } from '../dto/update-post.dto';
import { Prisma } from 'generated/prisma';
import { NotFoundError } from 'src/common/errors/types/NotFoundError';

@Injectable()
export class PostsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPostDto: CreatePostDto): Promise<PostEntity> {
    const { authorEmail } = createPostDto;

    const user = await this.prisma.user.findUnique({
      where: { email: authorEmail as string },
    });

    if (!user) {
      throw new NotFoundError('Author not found.');
    }

    const data: Prisma.PostCreateInput = {
      ...createPostDto,
      author: {
        connect: { email: authorEmail as string },
      },
    };

    return await this.prisma.post.create({
      data,
    });
  }

  async findAll(): Promise<Array<PostEntity>> {
    return await this.prisma.post.findMany({
      include: {
        author: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  async findOne(id: number): Promise<PostEntity | null> {
    return await this.prisma.post.findUnique({
      where: {
        id,
      },
      include: {
        author: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    const { authorEmail } = updatePostDto;

    if (!authorEmail) {
      return this.prisma.post.update({ data: updatePostDto, where: { id } });
    }

    const user = await this.prisma.user.findUnique({
      where: { email: authorEmail },
    });

    if (!user) {
      throw new NotFoundError('Author not found.');
    }

    const data: Prisma.PostUpdateInput = {
      ...updatePostDto,
      author: {
        connect: {
          email: authorEmail,
        },
      },
    };

    return await this.prisma.post.update({
      where: {
        id,
      },
      data,
      include: { author: { select: { name: true } } },
    });
  }

  async remove(id: number) {
    return await this.prisma.post.delete({
      where: {
        id,
      },
    });
  }
}
