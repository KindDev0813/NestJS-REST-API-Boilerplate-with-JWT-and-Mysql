import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UsersEntity } from './entities/users.entity';
import { UsersDTO } from './dto/users.dto';
import { CreateUsersDTO } from './dto/create-user.dto';
import { UpdateUsersDTO } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private usersRepository: Repository<UsersEntity>,
  ) {}

  async showAll(): Promise<UsersDTO[]> {
    return await this.usersRepository.find();
  }

  async create(data: CreateUsersDTO): Promise<UsersDTO> {
    this.usersRepository.create(data);
    const user = await this.usersRepository.save(data);
    return user;
  }

  async getById(id: number): Promise<UsersDTO> {
    return await this.usersRepository.findOne({ where: { id: id } });
  }

  async update(id: number, data: UpdateUsersDTO): Promise<UsersDTO> {
    await this.usersRepository.update({ id }, data);
    return await this.usersRepository.findOne({ id });
  }

  async destroy(id: number): Promise<unknown> {
    await this.usersRepository.delete({ id });
    return { deleted: true };
  }

  async getByUsername(username: string): Promise<UsersDTO> {
    return await this.usersRepository.findOne({ username });
  }
}
