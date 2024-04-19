import {
	IsBooleanString,
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
	@IsBooleanString()
	@IsOptional()
	is_public: any;

	@IsNotEmpty()
	@IsNumberString()
	@IsOptional()
	duration: any;

	@IsNotEmpty()
	@IsNumberString()
	@IsOptional()
	user_id: any;

	@IsNotEmpty()
	@IsNumberString()
	number_of_persons: any;

	@IsNotEmpty()
	@IsDateString()
	start_at: string;
}
