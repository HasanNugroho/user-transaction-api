import * as bcrypt from 'bcrypt';

export class UserModel {
  id: string;
  name: string;
  email: string;
  password: string;
  token: string | null;

  static async create(
    name: string,
    email: string,
    rawPassword: string,
  ): Promise<UserModel> {
    const user = new UserModel();
    user.name = name;
    user.email = email;
    user.token = null;
    await user.encryptPassword(rawPassword);
    return user;
  }

  private async encryptPassword(rawPassword: string): Promise<void> {
    const saltOrRounds = 10;
    this.password = await bcrypt.hash(rawPassword, saltOrRounds);
  }

  async validatePassword(rawPassword: string): Promise<boolean> {
    return bcrypt.compare(rawPassword, this.password);
  }
}
