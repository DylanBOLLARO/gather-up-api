import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	Query,
	Req,
	ConflictException,
	HttpStatus
} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { Role } from "@prisma/client";
import { Request } from "express";
@Controller("user")
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get()
	findAll(@Query("role") role?: Role) {
		return this.userService.findAll(role);
	}

	@Get(":id")
	findOne(@Param("id") id: string) {
		return this.userService.findOne(+id);
	}

	// @Patch(":id")
	// update(@Param("id") id: string, @Body() updateUser: UpdateUserDto) {
	// 	return this.userService.update(+id, updateUser);
	// }

	@Delete(":id")
	delete(@Param("id") id: string) {
		return this.userService.delete(+id);
	}
}
