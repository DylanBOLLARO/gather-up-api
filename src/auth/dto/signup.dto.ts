import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class SignupDTO {
	@IsNotEmpty()
	@IsString()
	username: string;

	@IsNotEmpty()
	@IsEmail()
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
