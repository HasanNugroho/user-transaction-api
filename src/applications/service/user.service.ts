import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserModel } from 'src/domains/model/user';
import { IUserService } from 'src/domains/service/user.service.interface';
import { IUserRepository } from 'src/domains/repository/user.repository.interface';
import { CreateUserDto } from 'src/presentations/user/dto/create-user.dto';
import { USER_REPOSITORY } from 'src/common/constant';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
  ) {}

  // Method to get a user by ID
  async getById(id: string): Promise<UserModel> {
    const user = await this.userRepository.getById(id);
    if (!user) throw new NotFoundException(`User with ID ${id} not found`);
    return user;
  }

  async getByEmail(email: string): Promise<UserModel> {
    const user = await this.userRepository.getByEmail(email);
    if (!user)
      throw new NotFoundException(`User with email ${email} not found`);
    return user;
  }

  // Method to create a new user
  async create(payload: CreateUserDto): Promise<UserModel> {
    try {
      const existingUser = await this.userRepository.getByEmail(payload.email);
      if (existingUser) {
        throw new BadRequestException('Email is already in use');
      }

      const user = await UserModel.create(
        payload.name,
        payload.email,
        payload.password,
      );

      return await this.userRepository.create(user);
    } catch (error) {
      throw error;
    }
  }
}
