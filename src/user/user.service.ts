import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserRepositoryService } from '../user.repository/user.repository.service';
import { CreateUserDto } from './dto/create-user-dto';

@Injectable()
export class UserService {
    constructor(readonly repository: UserRepositoryService) { }

    async create(dto: CreateUserDto) {
        return this.repository.createUser(dto);
    }


    //async findOne(username: string) {
    //    return this.prismaService.user.findUnique({ where: { username } });
    //}
}
