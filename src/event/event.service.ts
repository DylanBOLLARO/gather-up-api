import {
	ConflictException,
	HttpException,
	HttpStatus,
	Injectable
} from "@nestjs/common";
import { CreateEventDto } from "./dto/create.event.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class EventService {
	constructor(private readonly prismaService: PrismaService) {}

	async create(createEvent: CreateEventDto) {
		const userCreated = await this.prismaService.event.create({
			data: createEvent
		});
		return userCreated;
	}

	async findAll() {
		return await this.prismaService.event.findMany();
	}

	async findOne(id: number) {
		const event = await this.prismaService.event.findUnique({
			where: { id, is_public: true }
		});

		if (!event)
			throw new ConflictException({
				statusCode: HttpStatus.NOT_FOUND,
				message: "This event doesn't exist."
			});

		return event;
	}

	async remove(id: number) {
		await this.prismaService.event.delete({
			where: { id }
		});
		return HttpStatus.OK;
	}
}
