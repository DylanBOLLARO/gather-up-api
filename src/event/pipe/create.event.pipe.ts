import { PipeTransform, Injectable, ArgumentMetadata } from "@nestjs/common";
import { CreateEventDto } from "../dto/create.event.dto";

@Injectable()
export class CreateEventValidationPipe implements PipeTransform {
	transform(value: CreateEventDto, metadata: ArgumentMetadata) {
		value.duration = parseInt(value?.duration, 10);
		value.user_id = parseInt(value?.user_id, 10);
		value.number_of_persons = parseInt(value?.number_of_persons, 10);
		value.is_public = value.is_public.toLowerCase() === "true";
		return value;
	}
}
