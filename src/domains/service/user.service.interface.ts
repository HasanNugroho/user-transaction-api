import { UserModel } from 'src/domains/model/user';
import { CreateUserDto } from 'src/presentations/user/dto/create-user.dto';

/**
 * Interface for the User service
 * Provides methods for handling user-related operations.
 */
export interface IUserService {
  /**
   * Fetch a user by their unique ID.
   * @param id - The ID of the user to retrieve.
   * @returns A promise that resolves to the user object.
   * @throws NotFoundException if the user is not found.
   */
  getById(id: string): Promise<UserModel>;

  /**
   * Fetch a user by their email.
   * @param email - The email of the user to retrieve.
   * @returns A promise that resolves to the user object.
   * @throws NotFoundException if the user is not found.
   */
  getByEmail(email: string): Promise<UserModel>;

  /**
   * Create a new user.
   * @param userData - The data of the user to create.
   * @returns A promise that resolves to the newly created user object.
   * @throws ConflictException if the email or username already exists.
   */
  create(userData: CreateUserDto): Promise<UserModel>;
}
