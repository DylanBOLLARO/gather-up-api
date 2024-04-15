import {
	Controller,
	Get,
	Post,
	Body,
	Param,
	Delete,
	UsePipes,
	ParseIntPipe
} from "@nestjs/common";
import { EventService } from "./event.service";
import { CreateEventDto } from "./dto/create.event.dto";
import { Public } from "src/common/decorators";
import { CreateEventValidationPipe } from "./pipe/create.event.pipe";
import { ApiTags } from "@nestjs/swagger";
@ApiTags("event")
@Controller("event")
export class EventController {
	constructor(private readonly eventService: EventService) {}

	// @Post()
	// @UsePipes(new CreateEventValidationPipe())
	// create(@Body() createEventDto: CreateEventDto) {
	// 	return this.eventService.create(createEventDto);
	// }

	// @Get()
	// @Public()
	// findAll() {
	// 	return this.eventService.findAll();
	// }

	// @Get(":id")
	// @Public()
	// @UsePipes(new ParseIntPipe())
	// findOne(@Param("id") id: number) {
	// 	return this.eventService.findOne(id);
	// }

	// @Delete(":id")
	// @UsePipes(new ParseIntPipe())
	// remove(@Param("id") id: number) {
	// 	return this.eventService.remove(id);
	// }
}
