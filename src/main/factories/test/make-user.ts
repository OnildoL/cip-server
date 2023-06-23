import { User, UserProps } from "@/application/entities/user";
import { Password } from "@/application/entities/value-objects/password";
import { UniqueEntityID } from "@/application/entities/value-objects/unique-entity-id";

export function makeUser(setAdmin: boolean, override?: Partial<UserProps>) {
  const user = User.create({
    company_id: new UniqueEntityID("1"),
    user: 3145,
    name: "NEW USER EXAMPLE",
    password: new Password("123456"),
    role: "COORDINATOR",
    ...override,
  });

  user.admin = setAdmin;

  return user;
}
