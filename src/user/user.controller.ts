import {
	Controller,
	Get,
	UseGuards,
	HttpCode,
	HttpStatus,
	Post,
	Body
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
import { UpdateImageDto } from "./dto/update-image.dto";

@ApiTags("user")
@Controller("user")
export class UserController {
	constructor(
		private readonly userService: UserService,
		private readonly prismaService: PrismaService
	) {}

	@Post("me/image")
	@UseGuards(AtGuard)
	@HttpCode(HttpStatus.OK)
	@ApiBearerAuth()
	@ApiOperation({ summary: "Permet la modification de la photo de profile" })
	async updatePorfileImage(
		@GetCurrentUser() currentUserJwt: any,
		@Body() data: UpdateImageDto
	) {
		const { sub: id } = currentUserJwt;
		return this.userService.updatePorfileImage({ ...data, user_id: id });
	}

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
