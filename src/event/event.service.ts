import { ConflictException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateEventFullDto } from "./dto/create.event.dto copy";

@Injectable()
export class EventService {
	constructor(private readonly prismaService: PrismaService) {}

	async create(createEvent: any) {
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
			where: { id }
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
	}
}
