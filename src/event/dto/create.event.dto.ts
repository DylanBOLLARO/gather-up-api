import {
	IsBooleanString,
	IsDateString,
	IsNotEmpty,
	IsNumberString,
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
	user_id: any;

	@IsNotEmpty()
	@IsBooleanString()
	is_public: any;

	@IsNotEmpty()
	@IsNumberString()
	duration: any;

	@IsNotEmpty()
	@IsNumberString()
	number_of_persons: any;

	@IsNotEmpty()
	@IsDateString()
	start_at: string;
}
