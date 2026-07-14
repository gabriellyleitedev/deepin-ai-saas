import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      "http://localhost:5173",
      "https://deepin-ai-saas.vercel.app",
    ],
    credentials: true,
  });

  await app.listen(3000);
}
bootstrap();
