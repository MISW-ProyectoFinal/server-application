import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { from, lastValueFrom, Observable } from 'rxjs';
import {
  BusinessError,
  BusinessLogicException,
} from '../shared/errors/business-errors';

const saltRounds = 10;
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(userCreated: User): Promise<User> {
    userCreated.password = await lastValueFrom(
      this.hashPassword(userCreated.password),
    );
    return await this.userRepository.save(userCreated);
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { email: email },
    });
    if (!user) {
      throw new BusinessLogicException(
        'El usuario que esta buscando no existe',
        BusinessError.NOT_FOUND,
      );
    }

    return user;
  }

  private hashPassword(password: string): Observable<string> {
    return from<Promise<string>>(bcrypt.hash(password, saltRounds));
  }
}
