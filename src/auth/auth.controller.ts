import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Public } from "../common/decorators";
import { SignupDTO } from "./dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { LoginDTO } from "./dto/login.dto";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Public()
	@Post("signup")
	@HttpCode(HttpStatus.CREATED)
	@ApiOperation({ summary: "Creating a new user" })
	@ApiResponse({
		status: HttpStatus.CREATED,
		description:
			"Code 201 indicates that the account has been created, don't return anything"
	})
	@ApiResponse({
		status: HttpStatus.CONFLICT,
		description:
			"The provided email address is already in use. Please use a different email for registration."
	})
	@ApiResponse({
		status: HttpStatus.BAD_REQUEST,
		description: "Fields are missing to create the user"
	})
	signup(@Body() signupDTO: SignupDTO) {
		console.log(signupDTO);
		return this.authService.signup(signupDTO);
	}

	@Public()
	@Post("login")
	@HttpCode(HttpStatus.OK)
	@ApiOperation({
		summary: "Recover access_token and refresh_token with login credentials"
	})
	@ApiResponse({
		status: HttpStatus.OK,
		description: "Returns JSON with access_token and refresh_token"
	})
	@ApiResponse({
		status: HttpStatus.FORBIDDEN,
		description: "Access Denied : Login credentials are not valid"
	})
	login(
		@Body()
		loginDTO: LoginDTO
	) {
		return this.authService.login(loginDTO);
	}
}
