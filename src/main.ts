import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.setGlobalPrefix("api/v1/");

	app.enableCors({
		origin: true,
		credentials: true,
		methods: ["GET", "POST", "PUT", "DELETE", "HEAD", "PATCH"]
	});
	app.useGlobalPipes(new ValidationPipe());

	initSwagger(app);
	await app.listen(3000);
}
bootstrap();

const initSwagger = (app: INestApplication): void => {
	const config = new DocumentBuilder().setTitle("Gether-Up API").build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup("api/v1/description", app, document);
};
