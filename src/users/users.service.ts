import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import * as argon2 from 'argon2';

import { PrismaService } from 'src/prisma/prisma.service';

import { UserDTO } from './dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    data: UserDTO,
    query?: Prisma.UserSelect,
  ): Promise<Partial<User>> {
    // hide some fields from the response
    if (query?.password) query.password = false;
    if (query?.googleAccessTOken) query.googleAccessTOken = false;
    if (query?.facebookAccessTOken) query.facebookAccessTOken = false;

    // hash the password using argon2
    data.password = await argon2.hash(data.password);

    return this.prisma.user.create({
      data,
      select: query,
    });
  }

  async update(
    where: Prisma.UserWhereUniqueInput,
    data: Prisma.UserUpdateInput,
    query?: Prisma.UserSelect,
  ): Promise<Partial<User>> {
    // hide password from the response
    if (query?.password) query.password = false;

    // hash the password using argon2
    if (data?.password) {
      data.password = await argon2.hash(String(data.password));
    }

    return this.prisma.user.update({
      where,
      data,
      select: query,
    });
  }

  async findAll(query?: Prisma.UserFindManyArgs): Promise<Partial<User>[]> {
    // hide password from the response
    if (query?.select?.password) query.select.password = false;

    return await this.prisma.user.findMany(query);
  }

  async findUnique(
    where: Prisma.UserWhereUniqueInput,
    query?: Prisma.UserSelect,
  ): Promise<Partial<User>> {
    // hide password from the response
    if (query?.password) query.password = false;

    return this.prisma.user.findUnique({ where, select: query });
  }

  async findOneOrCreateOne(data: UserDTO) {
    const user = await this.findUnique({ email: data?.email });

    if (user) return user;

    // hash the password using argon2
    return await this.create(data);
  }
}
