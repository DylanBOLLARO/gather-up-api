import {
	IsDateString,
	IsNotEmpty,
	IsNumberString,
	IsOptional,
	IsString
} from "class-validator";

export class CreateEventDto {
	@IsNotEmpty()
	@IsString()
	title: string;

	@IsNotEmpty()
	@IsString()
	description: string;

	@IsNotEmpty()
	@IsNumberString()
	number_of_persons: number;

	@IsNotEmpty()
	@IsDateString()
	start_at: string;
}
