import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.setGlobalPrefix("api/v1/");
	app.enableCors({
		origin: true,
		credentials: true,
		methods: ["GET", "POST", "PUT", "DELETE", "HEAD", "PATCH"]
	});
	app.useGlobalPipes(new ValidationPipe());
	await app.listen(3000);
}
bootstrap();
