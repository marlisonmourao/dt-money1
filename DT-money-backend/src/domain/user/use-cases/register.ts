import { hashSync } from "bcrypt";
import { sign } from "jsonwebtoken";
import { UserTypeormRepository } from "../../../infra/database/typeorm/dt-money/repositories/user.repository";
import { UnauthenticatedError } from "../../../shared/errors/unauthenticated.error";
import { AuthReponse } from "../interfaces/authResponse";
import { CreateUserParams } from "../repositoryInterface/user-repository.interface";

export class RegisterUseCase {
  private authRepository: UserTypeormRepository;

  constructor() {
    this.authRepository = new UserTypeormRepository();
  }

  async execute(user: CreateUserParams): Promise<AuthReponse> {
    const userAlredyExists = await this.authRepository.findByEmail(user.email);

    if (userAlredyExists) {
      throw new UnauthenticatedError("O E-mail já está cadastrado!");
    }

    const encryptedPassword = hashSync(user.password, 10);

    const userCreated = await this.authRepository.createUser({
      ...user,
      password: encryptedPassword,
    });

    const token = sign(
      {
        id: userCreated.id,
        email: userCreated.email,
      },
      process.env.APP_SECRET_KEY,
      {
        expiresIn: "365d",
        algorithm: "HS256",
      }
    );

    delete userCreated.password;

    return {
      token,
      user: userCreated,
    };
  }
}
