import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create.user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { hash } from 'argon2';



@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService){}

  async create(createUserDto: CreateUserDto) {
    const {password, username} = createUserDto;
    const encrPassword = await hash(password);
    return await this.prisma.user.create({
      data: {
        password: encrPassword,
        username: username
      }
    })
  }

  async findUserByName(name:string){
    return await this.prisma.user.findUnique({
      where: {
        username: name,
      },
    });
  }

  async findOne(userId:number) {
    return await this.prisma.user.findUnique({
      where: {
        id: userId,
      }
    })
  }

  async updateHashedRefreshToken(userId: number, hashedRT: string | null) {
    return await this.prisma.user.update({
      where: {id: userId},
      data: { hashedRefreshToken:hashedRT}
    })
  }
}
