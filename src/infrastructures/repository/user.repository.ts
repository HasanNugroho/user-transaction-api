import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IUserRepository } from 'src/domains/repository/user.repository.interface';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import { UserModel } from 'src/domains/model/user';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(User)
    private readonly db: Repository<User>,
  ) {}

  async create(user: UserModel): Promise<UserModel> {
    try {
      const userEntity = await this.db.save(user as any);
      return this.toUser(userEntity as User);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('User already exists');
      }
      throw new InternalServerErrorException(error);
    }
  }

  async getById(id: string): Promise<UserModel | null> {
    const userEntity = await this.db.findOne({ where: { id } });
    if (!userEntity) return null;
    return this.toUser(userEntity);
  }

  async getByEmail(email: string): Promise<UserModel | null> {
    const userEntity = await this.db.findOne({ where: { email } });
    if (!userEntity) return null;
    return this.toUser(userEntity);
  }

  async getByToken(token: string): Promise<UserModel | null> {
    const userEntity = await this.db.findOne({ where: { token } });
    if (!userEntity) return null;
    return this.toUser(userEntity);
  }

  async update(id: string, userData: Partial<UserModel>): Promise<UserModel> {
    const existingUser = await this.db.findOne({ where: { id } });

    if (!existingUser) {
      throw new NotFoundException('User not found');
    }

    try {
      const userDataForEntity: Partial<User> = {
        ...userData,
        token: userData.token ?? undefined,
      };
      const updatedUser = this.db.merge(existingUser, userDataForEntity);
      const userEntity = await this.db.save(updatedUser);
      return this.toUser(userEntity);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  private toUser(userEntity: User): UserModel {
    return plainToInstance(UserModel, userEntity);
  }
}
