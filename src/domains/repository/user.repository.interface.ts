import { UserModel } from '../model/user';

export interface IUserRepository {
  /**
   * @param id - The ID of the user to get
   *
   * @returns The user with the given ID, or null if not found
   */
  getById(id: string): Promise<UserModel | null>;

  /**
   * @param email - The email of the user to get
   *
   * @returns The user with the given email, or null if not found
   */
  getByEmail(email: string): Promise<UserModel | null>;

  /**
   * @param token - The token of the user to get
   *
   * @returns The user with the given token, or null if not found
   */
  getByToken(token: string): Promise<UserModel | null>;

  /**
   * @param user - The user to create
   *
   * @returns The created user
   */
  create(user: UserModel): Promise<UserModel>;

  /**
   * @param id - identifier of the user to update
   * @param user - The user to update
   *
   * @returns The updated user
   */
  update(id: string, userData: Partial<UserModel>): Promise<UserModel>;
}
