import { Controller, Get, Param, Delete, Query } from "@nestjs/common";
import { UserService } from "./user.service";
import { Role } from "@prisma/client";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags("user")
@Controller("user")
export class UserController {
	constructor(private readonly userService: UserService) {}

	@ApiOperation({ summary: "Create cat" })
	@ApiResponse({ status: 402, description: "Forbidden." })
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
