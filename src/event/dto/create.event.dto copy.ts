import { PartialType } from "@nestjs/mapped-types";
import { CreateEventDto } from "./create.event.dto";
import { IsNotEmpty, IsNumberString } from "class-validator";

export class CreateEventFullDto extends PartialType(CreateEventDto) {
	@IsNotEmpty()
	@IsNumberString()
	user_id: string;
}
