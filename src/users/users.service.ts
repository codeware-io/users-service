import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import * as argon2 from 'argon2';

import { PrismaService } from 'src/prisma/prisma.service';

import { UserDTO } from './dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: UserDTO): Promise<User> {
    // hash the password using argon2
    data.password = await argon2.hash(data.password);

    return this.prisma.user.create({
      data,
    });
  }

  async update(
    where: Prisma.UserWhereUniqueInput,
    data: Prisma.UserUpdateInput,
  ): Promise<User> {
    // hash the password using argon2
    if (data?.password) {
      data.password = await argon2.hash(String(data.password));
    }

    return this.prisma.user.update({
      where,
      data,
    });
  }

  async findAll(query?: Prisma.UserFindManyArgs): Promise<Partial<User>[]> {
    return await this.prisma.user.findMany(query);
  }

  async findUnique(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.findUnique({ where });
  }

  async findOneOrCreateOne(data: UserDTO) {
    const user = await this.findUnique({ email: data?.email });

    if (user) return user;

    // hash the password using argon2
    return await this.create(data);
  }
}
