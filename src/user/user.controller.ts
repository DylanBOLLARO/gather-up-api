import {
	Controller,
	Get,
	UseGuards,
	HttpCode,
	HttpStatus
} from "@nestjs/common";
import { UserService } from "./user.service";
import {
	ApiBearerAuth,
	ApiOperation,
	ApiResponse,
	ApiTags
} from "@nestjs/swagger";
import { PrismaService } from "src/prisma/prisma.service";
import { AtGuard } from "src/common/guards";
import { GetCurrentUser } from "src/common/decorators";
import { UserDto } from "./dto/user.dto";

@ApiTags("user")
@Controller("user")
export class UserController {
	constructor(
		private readonly userService: UserService,
		private readonly prismaService: PrismaService
	) {}

	@Get("me")
	@UseGuards(AtGuard)
	@HttpCode(HttpStatus.OK)
	@ApiBearerAuth()
	@ApiOperation({ summary: "Recover user data using jwt" })
	@ApiResponse({
		status: HttpStatus.OK,
		type: UserDto
	})
	@ApiResponse({
		status: HttpStatus.UNAUTHORIZED,
		description: "Unauthorized : The access token used is not valid"
	})
	async verifyToken(@GetCurrentUser() currentUserJwt: any) {
		const { sub: id } = currentUserJwt;

		const currentUser = await this.prismaService.user.findUniqueOrThrow({
			where: {
				id
			}
		});

		delete currentUser.password;
		return currentUser;
	}
}
