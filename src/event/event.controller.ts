import {
	Controller,
	Get,
	Post,
	Body,
	Param,
	Delete,
	UsePipes,
	ParseIntPipe,
	HttpStatus
} from "@nestjs/common";
import { EventService } from "./event.service";
import { CreateEventDto } from "./dto/create.event.dto";
import {
	GetCurrentUser,
	GetCurrentUserId,
	Public
} from "src/common/decorators";
import { CreateEventValidationPipe } from "./pipe/create.event.pipe";
import {
	ApiBearerAuth,
	ApiOperation,
	ApiResponse,
	ApiTags
} from "@nestjs/swagger";
@ApiTags("event")
@Controller("event")
export class EventController {
	constructor(private readonly eventService: EventService) {}

	@Post()
	@ApiBearerAuth()
	@ApiOperation({ summary: "Creating an event" })
	@ApiResponse({
		status: HttpStatus.CREATED,
		description: "The event was perfectly created"
	})
	@ApiResponse({
		status: HttpStatus.UNAUTHORIZED,
		description: "The access token is no longer valid"
	})
	@UsePipes(new CreateEventValidationPipe())
	create(
		@GetCurrentUser() currentUserJwt: any,
		@Body() createEventDto: CreateEventDto
	) {
		const { sub: id } = currentUserJwt;
		return this.eventService.create({ ...createEventDto, user_id: +id });
	}

	@Get()
	@Public()
	@ApiOperation({ summary: "Retrieving all events" })
	@ApiResponse({
		status: HttpStatus.OK,
		description: "Retrieving all events in the response"
	})
	findAll() {
		return this.eventService.findAll();
	}

	@Get(":id")
	@ApiOperation({ summary: "Retrieving a specific event" })
	@ApiResponse({
		status: HttpStatus.OK,
		description: "Retrieving a specific event in the response"
	})
	@Public()
	@UsePipes(new ParseIntPipe())
	findOne(@Param("id") id: number) {
		return this.eventService.findOne(id);
	}

	@Delete(":id")
	@ApiOperation({ summary: "Deleting an event" })
	@ApiResponse({
		status: HttpStatus.OK,
		description: "Does not return a body, but deletes the event"
	})
	@UsePipes(new ParseIntPipe())
	remove(@Param("id") id: number) {
		return this.eventService.remove(id);
	}
}
