import { IsNotEmpty, IsString } from "class-validator";

export class SignupAuthDto {
	@IsNotEmpty()
	@IsString()
	username: string;

	@IsNotEmpty()
	@IsString()
	email: string;

	@IsNotEmpty()
	@IsString()
	password: string;

	@IsNotEmpty()
	@IsString()
	firstname: string;

	@IsNotEmpty()
	@IsString()
	lastname: string;
}
