import { IsEmail, IsNotEmpty } from "class-validator";

export class UserDto {
	@IsNotEmpty()
	readonly username: string;

	@IsNotEmpty()
	@IsEmail()
	readonly email: string;

	@IsNotEmpty()
	readonly firstname: string;

	@IsNotEmpty()
	readonly lastname: string;

	@IsNotEmpty()
	readonly created_at: string;

	@IsNotEmpty()
	readonly updated_at: string;

	@IsNotEmpty()
	readonly role: string;

	@IsNotEmpty()
	readonly hashed_rt: string;
}
