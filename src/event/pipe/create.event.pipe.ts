import { PipeTransform, Injectable } from "@nestjs/common";
import { CreateEventDto } from "../dto/create.event.dto";

@Injectable()
export class CreateEventValidationPipe implements PipeTransform {
	transform(value: CreateEventDto) {
		value.number_of_persons =
			parseInt("" + value?.number_of_persons, 10) || 0;
		return value;
	}
}
