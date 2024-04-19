import {
	ConflictException,
	Get,
	HttpCode,
	HttpStatus,
	Injectable,
	UseGuards
} from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { JwtPayload, Tokens } from "./types";
import { LoginDTO } from "./dto/login.dto";
import { AtGuard } from "src/common/guards";
import { GetCurrentUser } from "src/common/decorators";
import { SignupDTO } from "./dto";

@Injectable()
export class AuthService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly jwtService: JwtService,
		private readonly configService: ConfigService
	) {}

	async refreshTokens(userId: number, rt: string): Promise<Tokens> {
		const user = await this.prismaService.user.findUnique({
			where: {
				id: userId
			}
		});

		if (!user || !user.hashed_rt)
			throw new ConflictException({
				statusCode: HttpStatus.FORBIDDEN,
				message: "Access Denied"
			});

		const rtMatches = await bcrypt.compare(rt, user.hashed_rt);

		if (!rtMatches)
			throw new ConflictException({
				statusCode: HttpStatus.FORBIDDEN,
				message: "Access Denied"
			});

		const tokens = await this.getTokens(user.id, user.email);
		await this.updateRtHash(user.id, tokens.refresh_token);

		return tokens;
	}

	async updateRtHash(userId: number, rt: string): Promise<void> {
		const hashPassword = bcrypt.hashSync(rt, 10);

		await this.prismaService.user.update({
			where: {
				id: userId
			},
			data: {
				hashed_rt: hashPassword
			}
		});
	}

	async getTokens(userId: number, email: string): Promise<Tokens> {
		const jwtPayload: JwtPayload = {
			sub: userId,
			email: email
		};

		const [at, rt] = await Promise.all([
			this.jwtService.signAsync(jwtPayload, {
				secret: this.configService.get<string>("AT_SECRET"),
				expiresIn: "7d"
			}),
			this.jwtService.signAsync(jwtPayload, {
				secret: this.configService.get<string>("RT_SECRET"),
				expiresIn: "7d"
			})
		]);

		return {
			access_token: at,
			refresh_token: rt
		};
	}

	async signup(signup: SignupDTO) {
		const { email, password } = signup;
		const hashPassword = bcrypt.hashSync(password, 10);

		const user = await this.prismaService.user.findUnique({
			where: {
				email
			}
		});

		if (user)
			throw new ConflictException({
				statusCode: HttpStatus.CONFLICT,
				message:
					"The provided email address is already in use. Please use a different email for registration."
			});

		await this.prismaService.user.create({
			data: {
				...signup,
				password: hashPassword
			}
		});
	}

	async login(LoginDTO: LoginDTO): Promise<any> {
		const { email, password } = LoginDTO;

		const user = await this.prismaService.user.findUnique({
			where: {
				email
			}
		});

		if (!user)
			throw new ConflictException({
				statusCode: HttpStatus.FORBIDDEN,
				message: "Access Denied"
			});

		const passwordMatches = await bcrypt.compare(password, user.password);

		if (!passwordMatches)
			throw new ConflictException({
				statusCode: HttpStatus.FORBIDDEN,
				message: "Access Denied"
			});

		return await this.getTokens(user.id, user.email);
	}

	async signToken(
		userId: number,
		email: string
	): Promise<{ access_token: string }> {
		const payload = {
			sub: userId,
			email
		};
		const secret = this.configService.get("AT_SECRET");

		const token = await this.jwtService.signAsync(payload, {
			expiresIn: "15m",
			secret: secret
		});

		return {
			access_token: token
		};
	}

	async logout(userId: number): Promise<boolean> {
		await this.prismaService.user.updateMany({
			where: {
				id: userId,
				hashed_rt: {
					not: null
				}
			},
			data: {
				hashed_rt: null
			}
		});
		return true;
	}

	@Get()
	@UseGuards(AtGuard)
	@HttpCode(HttpStatus.OK)
	async getMe(@GetCurrentUser() currentUserJwt: any) {
		const { email } = currentUserJwt;

		const currentUser = await this.prismaService.user.findUniqueOrThrow({
			where: {
				email
			}
		});

		delete currentUser.password;

		return currentUser;
	}
}
