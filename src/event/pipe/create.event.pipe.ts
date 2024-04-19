import { PipeTransform, Injectable } from "@nestjs/common";
import { CreateEventDto } from "../dto/create.event.dto";

@Injectable()
export class CreateEventValidationPipe implements PipeTransform {
	transform(value: CreateEventDto) {
		value.duration = parseInt(value?.duration, 10) || 0;
		value.number_of_persons = parseInt(value?.number_of_persons, 10) || 0;
		if (typeof value.is_public === "string") {
			value.is_public = value.is_public.toLowerCase() === "true";
		}
		return value;
	}
}
