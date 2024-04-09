import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Post,
	UseGuards
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { GetCurrentUser, GetCurrentUserId, Public } from "../common/decorators";
import { SignupAuthDto } from "./dto";
import { SigninAuthDto } from "./dto/signin-auth.dto";
import { AtGuard, RtGuard } from "src/common/guards";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
@ApiTags("auth")
@Controller("auth")
export class AuthController {
	constructor(private authService: AuthService) {}

	@Public()
	@Post("signup")
	@HttpCode(HttpStatus.CREATED)
	@ApiOperation({ summary: "Creating a new user" })
	signup(@Body() signup: SignupAuthDto) {
		console.log("signup");
		return this.authService.signup(signup);
	}

	@Public()
	@Post("signin")
	@HttpCode(HttpStatus.OK)
	@ApiOperation({ summary: "Login to an account" })
	@ApiResponse({ status: 401, description: "Check connection credentials" })
	signin(@Body() signin: SigninAuthDto) {
		console.log("signin");
		return this.authService.signin(signin);
	}

	@UseGuards(AtGuard)
	@Post("get-connected-user-id")
	@HttpCode(HttpStatus.OK)
	verifyToken(@GetCurrentUser() user: any) {
		return user;
	}

	@Post("logout")
	@HttpCode(HttpStatus.OK)
	logout(@GetCurrentUserId() userId: number): Promise<boolean> {
		return this.authService.logout(userId);
	}

	@Public()
	@UseGuards(RtGuard)
	@Post("refresh")
	@HttpCode(HttpStatus.OK)
	refreshTokens(
		@GetCurrentUserId() userId: number,
		@GetCurrentUser("refreshToken") refreshToken: string
	) {
		return this.authService.refreshTokens(userId, refreshToken);
	}
}
