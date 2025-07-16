import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { USER_REPOSITORY } from 'src/common/constant';
import { UserModel } from 'src/domains/model/user';
import { IUserRepository } from 'src/domains/repository/user.repository.interface';
import { IAuthService } from 'src/domains/service/auth.service.interface';
import { Credential } from 'src/presentations/user/dto/auth.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
  ) {}

  async login(credential: Credential): Promise<string> {
    const { email, password } = credential;

    try {
      const user = await this.userRepository.getByEmail(email);

      if (!user || !(await user.validatePassword(password))) {
        throw new UnauthorizedException('Invalid identifier or password');
      }

      const newUuid = uuidv4();
      await this.userRepository.update(user.id, {
        token: newUuid,
      } as Partial<UserModel>);

      return newUuid;
    } catch (error) {
      throw error;
    }
  }
}
