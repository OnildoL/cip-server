import { Either, left, right } from "@/application/entities/either";
import { UniqueEntityID } from "@/application/entities/value-objects/unique-entity-id";
import { UserRepository } from "../ports/user-repository";
import { UserisNotanAdmin } from "../errors/user-is-not-an-admin";
import { CompanyUser } from "@/application/entities/company-user";
import { CompanyUserRepository } from "../ports/company-user-repository";

interface CreateCompanyUserUseCaseRequest {
  company_id: UniqueEntityID;
  user_id: UniqueEntityID;
  admin_id: UniqueEntityID;
}

type CreateCompanyUserUseCaseResponse = Either<UserisNotanAdmin, CompanyUser>;

export class CreateCompanyUserUseCase {
  constructor(
    private companyUserRepository: CompanyUserRepository,
    private userRepository: UserRepository
  ) {}

  async execute({
    company_id,
    user_id,
    admin_id,
  }: CreateCompanyUserUseCaseRequest): Promise<CreateCompanyUserUseCaseResponse> {
    const user = await this.userRepository.findById(admin_id);

    if (!user?.admin) {
      return left(new UserisNotanAdmin());
    }

    const companyUser = CompanyUser.create({
      company_id,
      user_id,
    });

    await this.companyUserRepository.create(companyUser);

    return right(companyUser);
  }
}
